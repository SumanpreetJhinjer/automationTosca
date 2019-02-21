package infra.DBConnections;

import java.sql.Connection;
import java.sql.DriverManager;

public class ApplicationConnection {

	

	/*private static final String URL_DEV = "jdbc:oracle:thin:@localhost:1521/INFRASSPDBXDB";
	private static final String USER = "INFRA_TEST";
	private static final String PASSWORD = "INFRA_TEST";*/
	
	private static final String URL_DEV = "jdbc:oracle:thin:@ssdb0201n02-oravip:1521/DF0012D";
	private static final String USER = "TOSCA_08";
	private static final String PASSWORD = "Telstra123";


	private static final String DRIVER_CLASS = "oracle.jdbc.driver.OracleDriver";

	public static Connection applicationDBConnection() {
		 Connection applicationConnection = null;

		try {
			Class.forName(DRIVER_CLASS);

			applicationConnection = DriverManager.getConnection(URL_DEV, USER, PASSWORD);

		} catch (Exception e) {
		System.out.println("Exception in connection"+e);

		}

		return applicationConnection;
	}

}
