package org.expee.splitters;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;

/**
 * Given an image file, splits it into N parts where each part represents one section of the image
 * 
 * @author Peijin Zhang
 */
public class ImageSplitter extends AbstractSplitter
{
	private BufferedImage image;

	public ImageSplitter(String input, String num, String aspect, String distribution) 
			throws IOException {
		super(input, num, aspect, distribution);

		image = ImageIO.read(new File(input));
	}

	public int[] getResolution() {
		int[] resolution = new int[2];
		resolution[0] = image.getWidth();
		resolution[1] = image.getHeight();
		return resolution;
	}

	/**
	 * Resizes the input to the new dimensions given by getNewResolution
	 * The image is extended in either the X or Y direction with extra blackspace to maintain
	 * the correct aspect ratio for the final display array
	 */
	public void scaleInput() throws IOException {
		int[] newres = getNewResolution();
		if (image.getWidth() < newres[0] || image.getHeight() < newres[1]) {
			// Need to scale, so do so

			BufferedImage newimage = new BufferedImage(newres[0], newres[1], image.getType());
			Graphics g = newimage.getGraphics();
			g.setColor(Color.BLACK);
			g.fillRect(0, 0, newres[0], newres[1]);

			if (image.getWidth() < newres[0]) {
				int offset = (newres[0] - image.getWidth()) / 2;
				g.drawImage(image, offset, 0, null);
			} else if (image.getHeight() < newres[1]) {
				int offset = (newres[1] - image.getHeight()) / 2;
				g.drawImage(image, 0, offset, null);
			}

			image = newimage;

			// This part isn't technically required, it's just good style (IMO) to have the 
			// invariant hold that image is the BufferedImage representation of the input file
			// We can remove this if it's affecting performance
			
			writeImage(image, getInput());
		}
	}
	
	/**
	 * Writes the given image to the destination path
	 */
	private void writeImage(BufferedImage image, String dest) 
			throws FileNotFoundException, IOException {
		String input = getInput();
		String ext = input.substring(input.lastIndexOf(".") + 1, input.length()).toLowerCase();
		if (ext.equals("jpeg") || ext.equals("jpg")) {
			// Don't compress jpegs
			ImageWriter writer = ImageIO.getImageWritersByFormatName(ext).next();
			ImageWriteParam param = writer.getDefaultWriteParam();
			param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
			param.setCompressionQuality(1.0F);
			writer.setOutput(new FileImageOutputStream(new File(dest)));
			writer.write(image);
		} else {
			ImageIO.write(image, ext, new File(dest));
		}
	}

	/**
	 * Splits the given image file to the N parts 
	 */
	public void splitFile() throws IOException {
		scaleInput();
		
		int[] dist = getDistribution();
		int cols = dist[0];
		int rows = dist[1];
		
		int[] res = getNewResolution();
		int width = res[0];
		int height = res[1];
		
		int screenwidth = width / cols;
		int screenheight = height / rows;
		
		String input = getInput();
		String base = input.substring(0, input.lastIndexOf("."));
		String ext = input.substring(input.lastIndexOf(".") + 1).toLowerCase();

		for (int x = 0; x < cols; x++) {
			for (int y = 0; y < rows; y++) {
				BufferedImage cropped = image.getSubimage(
						x * screenwidth, y * screenheight, screenwidth, screenheight);
				writeImage(cropped, base + "." + x + "." + y + "." + ext);
			}
		}
	}
}
