package org.expee;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Random;

/**
 * Every time this is called, will simply print out a random string to console that consists
 * of adjective + adjective + noun. Used for generation of random URLs
 * 
 * @author Peijin
 */
public class MakeRandomURL
{
	private ArrayList<String> readData(String file) throws IOException {
		ArrayList<String> result = new ArrayList<String>();
		
		BufferedReader br = new BufferedReader(new InputStreamReader(
				getClass().getResourceAsStream("data" + File.separator + file)));
		
		String nextline;
		while ((nextline = br.readLine()) != null) {
			result.add(nextline);
		}
		
		return result;
	}
	
	private void printRandomURL(ArrayList<String> adjectives, ArrayList<String> nouns) {
		Random random = new Random(System.currentTimeMillis());
		
		int firstadj = random.nextInt(adjectives.size());
		int secondadj = random.nextInt(adjectives.size());
		int noun = random.nextInt(adjectives.size());
		
		System.out.println(capitalize(adjectives.get(firstadj)) + 
											 capitalize(adjectives.get(secondadj)) + 
											 capitalize(nouns.get(noun)));
	}
	
	private String capitalize(String input) {
		return (Character.toUpperCase(input.charAt(0)) + input.substring(1)).trim();
	}
	
	public MakeRandomURL() throws IOException {
	  ArrayList<String> adjectives = readData("adjectives.txt");
	  ArrayList<String> nouns = readData("nouns.txt");
		printRandomURL(adjectives, nouns);
	}
	
	public static void main(String[] args) throws IOException
	{
		new MakeRandomURL();
	}
}
