package infra.getDetails;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import infra.DBConnections.ApplicationConnection;
import infra.FactorySet.FactoryMethods;

public class SoftwareDetails {
	ApplicationConnection appCon=new ApplicationConnection();
	FactoryMethods fm= new FactoryMethods();
	public  ArrayList<HashMap<String, Object>> getSoftwareName() throws SQLException{
			
			ArrayList<HashMap<String, Object>> projectNames = null;
			String query="select REFERENCE_NAME from infra_reference_data where reference_id='SOFTWARE'";
			Connection con=appCon.applicationDBConnection();
			
			try(Statement smt=con.createStatement()){
				 ResultSet rs = smt.executeQuery(query);
				 projectNames = fm.resultSetToArrayList(rs);
				// con.close();
			}catch(Exception E) {
				System.out.println("Exception "+E);
			}finally {
				con.close();
			}
			
			return projectNames;
			
		}

}
