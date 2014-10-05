package org.expee.splitters;

/**
 * Abstract class for splitting media into multiple files based on their location
 * 
 * @author Peijin Zhang
 */
public abstract class AbstractSplitter
{
  private final String input;
  private final int numScreens;
  private final String aspect;
  private final String distribution;
  
  /**
   * Creates an instance of an AbstractSplitter
   * 
   * @param input Path to input file
   * @param num Number of screens to split file over
   * @param aspect Aspect ratio of the screens 
   * @param distribution Desired distribution of the screens, nullable
   */
  public AbstractSplitter(String input, String num, String aspect, String distribution) {
    this.input = input;
    this.numScreens = Integer.parseInt(num);
    this.aspect = aspect;
    this.distribution = distribution;
  }
  
  public String getInput()
  {
    return input;
  }
  
  public int getNumScreens()
  {
    return numScreens;
  }
  
  /**
   * Given that the aspect ratio is given in X:Y form, returns an int array with 
   * the first element being X and the second being Y
   */
  public int[] getAspect()
  {
    int[] asp = new int[2];
    String[] dat = aspect.split(":");
    asp[0] = Integer.parseInt(dat[0]);
    asp[1] = Integer.parseInt(dat[1]);
    return asp;
  }

  /**
   * Returns the distribution of screens for the splitting
   * First element is number of columns, second is number of rows
   */
  public int[] getDistribution()
  {
    int[] dist = new int[2];
    if (distribution != null) {
      String[] dat = distribution.split(":");
      dist[0] = Integer.parseInt(dat[0]);
      dist[1] = Integer.parseInt(dat[1]);
    } else {
      int[] res = getResolution();
      int width = res[0];
      int height = res[1];
      
      int[] asp = getAspect();
      int awidth = asp[0];
      int aheight = asp[1]; 
      
      dist[1] = (int) Math.round(Math.sqrt(
          (double) (height * numScreens * awidth) / (width * aheight)));
      dist[0] = numScreens / dist[1];
    }
    
    return dist;
  }
  
  /**
   * Returns the total number of screens in the display array
   */
  public int getScreensUsed() {
    int[] dist = getDistribution();
    return dist[0] * dist[1];
  }
  
  /**
   * Returns new resolution needed to scale to
   */
  int[] getNewResolution() {
    int[] newres = new int[2];
    
    int[] dist = getDistribution();
    int cols = dist[0];
    int rows = dist[1];
    
    int[] res = getResolution();
    int width = res[0];
    int height = res[1];
    
    int[] aspect = getAspect();
    
    int desheight = (int)((double) width / cols * aspect[1] / aspect[0]) * rows;
    int deswidth = (int)((double) height / rows * aspect[0] / aspect[1]) * cols;

    newres[0] = res[0];
    newres[1] = res[1];
    if (deswidth > width) {
      newres[0] = deswidth;
    } else if (desheight > height) {
      newres[1] = desheight;
    } 
    
    return newres;
  }
  
  abstract int[] getResolution();
  
  abstract void scaleInput() throws Exception;

  public abstract void splitFile() throws Exception;
}
