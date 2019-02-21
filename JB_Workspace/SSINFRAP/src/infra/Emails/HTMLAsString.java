package infra.Emails;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class HTMLAsString {
	
	public String HTMLToString(String fileName,String serverPath) throws FileNotFoundException, IOException {

		String content="";
		String inputLine;
		StringBuilder strContent = new StringBuilder("");

		serverPath = serverPath.replace("\\","/")+fileName+".html";
		
		URL keyURL   = new URL(serverPath);
		BufferedReader in = new BufferedReader(new InputStreamReader(keyURL.openStream()));
		while ((inputLine = in.readLine()) != null) {
			strContent.append(inputLine);
		}
		content = strContent.toString();
		in.close();

		return content;
	}

}
