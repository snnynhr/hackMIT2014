package org.expee.splitters;

public abstract class AbstractSplitter
{
	public AbstractSplitter(String input, String aspect, String distribution) {
		
	}
	
	public abstract int[] getResolution(String input);

	public abstract void splitFile();
}
