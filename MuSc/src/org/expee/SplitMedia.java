package org.expee;

import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.expee.splitters.AbstractSplitter;
import org.expee.splitters.ImageSplitter;
import org.expee.splitters.VideoSplitter;

/** 
 * Main class for doing the media splitting with MuSc
 * 	call with "java -jar MuSc.jar -p -i image.jpg"
 * @author Peijin Zhang
 */
public class SplitMedia {
	
	/**
	 * Creates options for option parsing by CLI.
	 * Options: -p Whether or not
	 * @return Options object for parsing
	 */
	public static Options makeOptions() {
		Options options = new Options();
		
		// Required options
		options.addOption("p", "image", false, "Whether or not the media is an image");
		options.addOption("v", "video", false, "Whether or not the media is a video");
		options.addOption("i", "input", true, "Path to input file");
		options.addOption("n", "num-screens", true, "Number of screens");
		
		// Optional options
		options.addOption("a", "aspect-ratio", true, "Aspect ratio of the screens");
		options.addOption("d", "distribution", true, "Distribution of screens (rows x columns)");
		
		return options;
	}
	
	/**
	 * Main function for splitting videos 
	 * @param args Command line arguments
	 * @throws ParseException 
	 */
	public static void main(String[] args) throws ParseException {
		CommandLine cmd = new BasicParser().parse(makeOptions(), args);
		if (!cmd.hasOption("input")) {
			throw new IllegalArgumentException("Input argument must be specified");
		} else if (!cmd.hasOption("num-screens")) {
			throw new IllegalArgumentException("Number of screens must be specified");
		} else if (!(cmd.hasOption("image") ^ cmd.hasOption("video"))) {
			throw new IllegalArgumentException("One of image or video argument must be specified");
		}
		
		// valid command lines arguments
		
		AbstractSplitter splitter = null;
		if (cmd.hasOption("image")) {
			splitter = new ImageSplitter(cmd.getOptionValue("input"), 
					cmd.getOptionValue("aspect-ratio", "16:9"),
					cmd.getOptionValue("distribution"));
		}
		if (cmd.hasOption("video")) {
			splitter = new VideoSplitter(cmd.getOptionValue("input"), 
				  cmd.getOptionValue("aspect-ratio", "16:9"),
				  cmd.getOptionValue("distribution"));
		}
		splitter.splitFile();
	}
}
