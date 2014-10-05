package org.expee.splitters;

/**
 * Given an image file, splits it into N parts where each part represents one
 * section of the image Each part is guaranteed to have the same bitrate and
 * play at the same speed
 * 
 * @author Peijin Zhang
 */
public class VideoSplitter extends AbstractSplitter
{
  public VideoSplitter(String input, String num, String aspect,
      String distribution)
  {
    super(input, num, aspect, distribution);
  }

  public int[] getResolution()
  {
    int[] resolution = new int[2];

    return resolution;
  }

  public void scaleInput()
  {

  }

  public void splitFile()
  {

  }
}
