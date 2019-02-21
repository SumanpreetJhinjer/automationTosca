package infra.Emails;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class EmailReports {

	public String requestCompleteEmail(String serverPath, String userID, String emailID, String teamName,
			String project, ArrayList<HashMap<String, Object>> machineDetails)
			throws FileNotFoundException, IOException {
		String status = null;
		serverPath = serverPath.replace("rest/", "emailReports/");
		HTMLAsString htmlAsString = new HTMLAsString();
		SMTPService mail = new SMTPService();
		String htmlString = "";
		String defaultEmail="LandSSEnablersInfrastructure@team.telstra.com";
		List<String> toAddress=new ArrayList<String>();
		toAddress.add(defaultEmail);
		toAddress.add(emailID);
		
		/*String toAddress = emailID;*/
		String ccAddress = "jeevan.bhimavarapu@team.telstra.com";
				//"LandSSEnablersInfrastructure@team.telstra.com";
				//"jeevan.bhimavarapu@team.telstra.com";
		String subject = "Infrastructure Cloud Machine Request Processed(Test Email) ";
		htmlString = htmlAsString.HTMLToString("requestConfirmationEmail", serverPath);

		htmlString = htmlString.replace("<userID>", userID);
		htmlString = htmlString.replace("<project>", project);
		htmlString = htmlString.replace("<team>", teamName);

		String cloudMachinesDetails = "";

		for (HashMap<String, Object> entry : machineDetails) {
			cloudMachinesDetails = cloudMachinesDetails + "<tr>";
			
			cloudMachinesDetails = cloudMachinesDetails + "<td class=\"align-center\">"
					+ (String) entry.get("MACHINENAME") + "</td>" + "<td class=\"align-center\">"
					+ (String) entry.get("APPLICATION") + "</td>" + "<td class=\"align-center\">"
					+ (String) entry.get("BUILD_COMMENTS") + "</td>";

			cloudMachinesDetails = cloudMachinesDetails + "</tr>";
		}

		htmlString = htmlString.replace("<machineDetails>", cloudMachinesDetails);
		

		status = mail.sendMessage(toAddress, ccAddress, subject, htmlString);
		System.out.println(status);
		return status;
	}
	
	public String requestBuildEmail(String appname,String emailID,String environment,String type,String installDrive,String hostname, String osSelect, String otherDrive, String requestNumber,String serverPath,String version,String userID,String appmgremailID)
			throws FileNotFoundException, IOException {
		String status = null;
		serverPath = serverPath.replace("rest/", "emailReports/");
		HTMLAsString htmlAsString = new HTMLAsString();
		SMTPService mail = new SMTPService();
		String htmlString = "";
		String defaultEmail="sumanpreet.jhinjer@team.telstra.com";
		List<String> toAddress=new ArrayList<String>();
		toAddress.add(defaultEmail);
		toAddress.add(appmgremailID);
		toAddress.add(userID);
		
		for (String tag : emailID.split("[\\;]+"))
	    {
	      toAddress.add(tag);
	    }
		
		
		/*String toAddress = emailID;*/
		String ccAddress = "sumanpreet.jhinjer@team.telstra.com";
				//"LandSSEnablersInfrastructure@team.telstra.com";
				//"jeevan.bhimavarapu@team.telstra.com";
		String subject = "Splunk on-boarding (Test Email) ";
		htmlString = htmlAsString.HTMLToString("buildRequestEmail", serverPath);
		
		htmlString = htmlString.replace("<appname>", appname);
		htmlString = htmlString.replace("<emailID>", emailID);
		htmlString = htmlString.replace("<environment>", environment);
		htmlString = htmlString.replace("<type>", type);
		htmlString = htmlString.replace("<installDrive>", installDrive);
		htmlString = htmlString.replace("<hostname>", hostname);
		htmlString = htmlString.replace("<osSelect>", osSelect);
		htmlString = htmlString.replace("<otherDrive>", otherDrive);
		htmlString = htmlString.replace("<requestNumber>", requestNumber);
		htmlString = htmlString.replace("<version>", version);
		htmlString = htmlString.replace("<userID>", userID);
		htmlString = htmlString.replace("<appmgremailID>", appmgremailID);

		

		status = mail.sendMessage(toAddress, ccAddress, subject, htmlString);
		System.out.println(status);
		return status;
	}

}
