package infra.getDetails;

import infra.FactorySet.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import infra.DBConnections.ApplicationConnection;

public class FAQ {
	ApplicationConnection appCon=new ApplicationConnection();
	FactoryMethods fm= new FactoryMethods();
	
public  ArrayList<HashMap<String, Object>> getQandA(){
		
		ArrayList<HashMap<String, Object>> questionAndAnswer = null;
		
		String query="SELECT * FROM INFRA_FAQ_DATA";
		
		try(Statement smt=appCon.applicationDBConnection().createStatement()){
			 ResultSet rs = smt.executeQuery(query);
			 questionAndAnswer = fm.resultSetToArrayList(rs);
			 //con.close();
		}catch(Exception E) {
			System.out.println("Exception "+E);
		}
		
		return questionAndAnswer;
		
	}

}
