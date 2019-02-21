package infra.getDetails;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Random;

import com.sun.jmx.snmp.Timestamp;

import infra.DBConnections.ApplicationConnection;
import infra.Emails.EmailReports;
import infra.FactorySet.FactoryMethods;

public class MachineDetails {
	ApplicationConnection appCon = new ApplicationConnection();
	FactoryMethods fm = new FactoryMethods();

	public ArrayList<HashMap<String, Object>> UpdateCleanMachineDetails(HashMap details, String serverPath)
			throws FileNotFoundException, IOException {
		ArrayList<HashMap<String, Object>> machineDetails = null;

		String appname = (String) details.get("appname");
		String emailID = (String) details.get("emailID");
		String environment = (String) details.get("environment");
		String type = (String) details.get("type");
		String installDrive = (String) details.get("installDrive");
		String hostname = (String) details.get("hostname");
		String osSelect = (String) details.get("osSelect");
		String otherDrive = (String) details.get("otherDrive");
		String version = (String) details.get("version");
		String userID = (String) details.get("userID");
		String appmgremailID = (String) details.get("appmgremailID");
		String oracleSID = (String) details.get("oracleSID");
		String owningID = (String) details.get("owningID");
		String groupId = (String) details.get("groupId");
		String secondaryEmailID = (String) details.get("secondaryEmailID");
		String givenName = (String) details.get("givenName");
		String surName = (String) details.get("surName");
		String mobileNumber = (String) details.get("mobileNumber");
		machineDetails = updateCleanQuery(appname, emailID, environment, type, installDrive, hostname, osSelect,
				otherDrive, serverPath, version, userID, appmgremailID, oracleSID, owningID, groupId, secondaryEmailID,
				givenName, surName, mobileNumber);

		return machineDetails;
	}

	public ArrayList<HashMap<String, Object>> updateCleanQuery(String appname, String emailID, String environment,
			String type, String installDrive, String hostname, String osSelect, String otherDrive, String serverPath,
			String version, String userID, String appmgremailID, String oracleSID, String owningID, String groupId,
			String secondaryEmailID, String givenName, String surName, String mobileNumber)
			throws FileNotFoundException, IOException {
		ArrayList<HashMap<String, Object>> updateResult = null;
		ArrayList<HashMap<String, Object>> reqStatus = null;
		String machineNames = "";
		Random random = new Random();
		long rndNum = createRandomInteger(1000000000, 9999999999L, random);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
		
       
        String timenow=sdf.format(new Date());
        String approvalStatus="PO Pending Approval";
		String requestNumber = "REQENV" + String.valueOf(rndNum);
//		        System.out.println("key = " + key);
		String updateQuery = "insert into ssp_env_req_details" + " values('" + appname + "', '" + emailID + "', '"
				+ environment + "', '" + type + "' , '" + installDrive + "' , '" + hostname + "', '" + osSelect + "', '"
				+ otherDrive + "','" + requestNumber + "','" + version + "','" + userID + "','" + appmgremailID + "','"
				+ oracleSID + "','" + owningID + "','" + groupId + "','"+secondaryEmailID+"','"+givenName+"','"+surName+"','"+mobileNumber+"','"+timenow+"','"+approvalStatus+"')";
		System.out.println("executeUpdate " + updateQuery);
		Connection con = appCon.applicationDBConnection();
		try {
			int executeUpdate = con.createStatement().executeUpdate(updateQuery);
			System.out.println("executeUpdate " + executeUpdate);
			// updateResult="";
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		EmailReports reports = new EmailReports();
		String emailStatus = reports.requestBuildEmail(appname, emailID, environment, type, installDrive, hostname,
				osSelect, otherDrive, requestNumber, serverPath, version, userID, appmgremailID);
		String reqstatusQuery = "select * from ssp_env_req_details where reqnum='"+requestNumber+"'";
		try(Statement smt=appCon.applicationDBConnection().createStatement()){
			 ResultSet rs = smt.executeQuery(reqstatusQuery);
			 reqStatus = fm.resultSetToArrayList(rs);
			 //con.close();
		}catch(Exception E) {
			System.out.println("Exception "+E);
		}
		finally {
			try {
				appCon.applicationDBConnection().close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return reqStatus;

	}

	public Statement statementFactoryForApp() {

		Statement statementForApp = null;
		try {
			statementForApp = appCon.applicationDBConnection().createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return statementForApp;


	}

	public static boolean isNullOrEmpty(String str) {
		if (str != null && !str.isEmpty())
			return false;
		return true;
	}

	private static long createRandomInteger(int aStart, long aEnd, Random aRandom) {
		if (aStart > aEnd) {
			throw new IllegalArgumentException("Start cannot exceed End.");
		}
		// get the range, casting to long to avoid overflow problems
		long range = aEnd - (long) aStart + 1;
		System.out.println("range>>>>>>>>>>>" + range);
		// compute a fraction of the range, 0 <= frac < range
		long fraction = (long) (range * aRandom.nextDouble());
		System.out.println("fraction>>>>>>>>>>>>>>>>>>>>" + fraction);
		long randomNumber = fraction + (long) aStart;
		System.out.println("Generated : " + randomNumber);

		return randomNumber;

	}

}
