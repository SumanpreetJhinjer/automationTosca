package infra.getDetails;

import infra.FactorySet.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import infra.DBConnections.ApplicationConnection;

public class UserDetails {
	ApplicationConnection appCon=new ApplicationConnection();
	FactoryMethods fm= new FactoryMethods();
	MachineDetails mc=new MachineDetails();
	
	

public  ArrayList<HashMap<String, Object>> getEnvName(){
	
	ArrayList<HashMap<String, Object>> envNames = null;
	String query="select distinct enviornment from ssp_env_req_details where enviornment is not null order by enviornment ";
	
	
	try(Statement smt=appCon.applicationDBConnection().createStatement()){
		 ResultSet rs = smt.executeQuery(query);
		 envNames = fm.resultSetToArrayList(rs);
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
	
	return envNames;
	
}

public  ArrayList<HashMap<String, Object>> getAppName(){
	
	ArrayList<HashMap<String, Object>> appNames = null;
	String query="select distinct appname from ssp_env_req_details where appname is not NULL order by appname";
	
	
	try(Statement smt=appCon.applicationDBConnection().createStatement()){
		 ResultSet rs = smt.executeQuery(query);
		 appNames = fm.resultSetToArrayList(rs);
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
	
	return appNames;
	
}

public  ArrayList<HashMap<String, Object>> getType(HashMap details){
	
	ArrayList<HashMap<String, Object>> envTypes = null;
	String env = (String) details.get("envselected");
	String query="select distinct type from ssp_env_req_details where enviornment='"+env+"' order by type ";
	
	
	try(Statement smt=appCon.applicationDBConnection().createStatement()){
		 ResultSet rs = smt.executeQuery(query);
		 envTypes = fm.resultSetToArrayList(rs);
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
	
	return envTypes;
	
}
	


}
