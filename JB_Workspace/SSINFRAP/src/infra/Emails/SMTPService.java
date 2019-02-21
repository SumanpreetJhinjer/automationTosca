package infra.Emails;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class SMTPService {
	
	public String sendMessage(List<String> userEmails, String ccEmail, String msgSubject, String msgText)
	{
		boolean transactional = false;
		String response = null;

		/**
		 * Connection parameters will be defined here
		 */
		String host = "inside.rr.in.telstra.com.au";
		int port = 25;

		// String username = MailProperties.username;
		//String password = MailProperties.password;
		String from = "sumanpreet.jhinjer@team.telstra.com";


		java.util.Properties props = System.getProperties();
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", port);
		props.put("mail.smtp.auth", "false");

		Transport transport = null;

		try {
			Session session = Session.getDefaultInstance(props, null);
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));

			for(String userEmail:userEmails) {
				
				InternetAddress to_address = new InternetAddress(userEmail);
				message.addRecipient(Message.RecipientType.TO, to_address);
				
			}

				
			

				InternetAddress cc_address = new InternetAddress(ccEmail);
				message.addRecipient(Message.RecipientType.CC, cc_address);
			


			message.setSubject(msgSubject);
			message.setContent(msgText, "text/html");
			transport = session.getTransport("smtp");
			transport.connect();
			transport.sendMessage(message, message.getAllRecipients());
			response = "Sent";
			return response;
		} catch (AddressException ex) {
			Logger.getLogger(SMTPService.class.getName()).log(Level.SEVERE, null, ex);
			return "Invalid Address";
		} catch (MessagingException ex) {
			Logger.getLogger(SMTPService.class.getName()).log(Level.SEVERE, null, ex);
			return "Unable to Send Mails";
		} finally {
			if (transport != null) {
				try {
					transport.close();
				} catch (MessagingException logOrIgnore) {
				}
			}
		}
	}
}
