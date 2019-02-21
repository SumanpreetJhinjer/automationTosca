package infra.getDetails;

import org.apache.commons.net.telnet.*;
import java.io.*;

public class RemoteConnection {
	
	
	/*public void rdpConnection() throws IOException {
		TelnetClient telnet = null;
		InputStream in = null;
		PrintStream out = null;

		try {
			telnet = new TelnetClient();
			telnet.connect("administ", 23);
			in = telnet.getInputStream();
			out = new PrintStream(telnet.getOutputStream());
			System.out.println("Successfully Connected");

			executeCommand("administrator", in, out);
			executeCommand("\n", in, out);
			executeCommand("", in, out);
			executeCommand("\n", in, out);

			executeCommand("dir", in, out);
			executeCommand("\n", in, out);

			readOutput(telnet.getInputStream());

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				in.close();
			}
			if (out != null) {
				out.close();
			}
			if (telnet != null) {
				telnet.disconnect();
				telnet = null;
				System.out.println("\nSuccessfully Disconnected");
			}
		}
	}

	public static void executeCommand(String command, InputStream in, PrintStream out) {
		for (int i = 0; i < command.length(); i++) {
			char c = command.charAt(i);
			out.write((int) c);
		}
	}

	public static void readOutput(InputStream in) {
		int j = 0;
		try {
			while (j < 300) {
				j++;
				System.out.print((char) in.read());
			}

		} catch (Exception e) {
		}
	}*/

}
