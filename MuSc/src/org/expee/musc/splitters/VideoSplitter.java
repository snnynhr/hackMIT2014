package org.expee.musc.splitters;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Given a video file, splits it into N parts where each part represents one
 * section of the image Each part is guaranteed to have the same bitrate and
 * play at the same speed
 * 
 * @author Peijin Zhang
 */
public class VideoSplitter extends AbstractSplitter {
  private static final int BUFFER_SIZE = 1024;
  private final String ffmpegPath;
  private final String ffprobePath;
  private String newvideo;
  private String bitrate;

  public VideoSplitter(String input, String num, String aspect, String distribution, 
      String ffmpeg, String ffprobe) throws IOException, InterruptedException {
    super(input, num, aspect, distribution);
    ffmpegPath = ffmpeg;
    ffprobePath = ffprobe;

    newvideo = getInputBase() + ".padded." + getInputExtension();
  }

  /**
   * Extracts a binary from under the bin package and gives it executable
   * permissions
   * 
   * TODO: This doesn't work on the Linux server for some reason, no time to fix. We
   * used a hack workaround but should figure this out later on
   */
  public String setup(String binary) throws IOException, InterruptedException {
    File temp = File.createTempFile(binary, "");
    temp.deleteOnExit();
    String path = temp.getCanonicalPath();

    BufferedInputStream in = new BufferedInputStream(getClass().getResourceAsStream(
        ".." + File.separator + "bin" + File.separator + binary));

    // Copy binary from jar to disk
    BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(temp));
    byte[] buf = new byte[BUFFER_SIZE];
    int len;
    while ((len = in.read(buf)) > 0) {
      out.write(buf, 0, len);
    }
    out.flush();
    out.close();
    in.close();

    // Make binary executable
    Process chmod = new ProcessBuilder("chmod", "+x", path).start();
    chmod.waitFor();

    return path;
  }

  public int[] getResolution() throws Exception {
    int[] resolution = new int[2];

    Process ffprobe = new ProcessBuilder(ffprobePath, "-i", getInput(), "-show_streams",
        "-select_streams", "v").redirectErrorStream(true).start();

    BufferedReader br = new BufferedReader(new InputStreamReader(ffprobe.getInputStream()));
    String nextline;
    while ((nextline = br.readLine()) != null) {
      if (nextline.contains("width=")) {
        resolution[0] = Integer.parseInt(nextline.substring(6));
      } else if (nextline.contains("height=")) {
        resolution[1] = Integer.parseInt(nextline.substring(7));
      } else if (nextline.contains("bit_rate=")) {
        bitrate = nextline.substring(9);
      }
    }
    br.close();

    return resolution;
  }

  public void scaleInput() throws Exception {
    int[] newres = getNewResolution();
    int[] res = getResolution();
    if (res[0] < newres[0]) {
      int offset = newres[0] - res[0];

      Process ffmpeg = new ProcessBuilder(ffmpegPath, "-i", getInput(), "-vf", "pad=width="
          + newres[0] + ":height=" + res[1] + ":x=" + offset + ":y=0", newvideo).start();
      ffmpeg.waitFor();
    } else if (res[1] < newres[1]) {
      int offset = newres[1] - res[1];

      Process ffmpeg = new ProcessBuilder(ffmpegPath, "-i", getInput(), "-vf", "pad=width="
          + res[0] + ":height=" + newres[1] + ":x=0:y=" + offset, newvideo).start();
      ffmpeg.waitFor();
    } else {
      newvideo = getInput();
    }
  }

  public void splitFile() throws Exception {
    scaleInput();

    int[] dist = getDistribution();
    int cols = dist[0];
    int rows = dist[1];

    int[] res = getNewResolution();
    int width = res[0];
    int height = res[1];

    int screenwidth = width / cols;
    int screenheight = height / rows;

    String base = getInputBase();
    String ext = getInputExtension();

    Process[][] ffmpeg = new Process[cols][rows];
    for (int x = 0; x < cols; x++) {
      for (int y = 0; y < rows; y++) {
        String shard = base + "." + x + "." + y + "." + ext;
        ffmpeg[x][y] = new ProcessBuilder(ffmpegPath, "-i", newvideo, "-vf", "crop=" + screenwidth
            + ":" + screenheight + ":" + x * screenwidth + ":" + y * screenheight, shard).start();
      }
    }

    for (int x = 0; x < cols; x++) {
      for (int y = 0; y < rows; y++) {
        ffmpeg[x][y].waitFor();
      }
    }
  }

  public int getBitrate() {
    return Integer.parseInt(bitrate);
  }
}
