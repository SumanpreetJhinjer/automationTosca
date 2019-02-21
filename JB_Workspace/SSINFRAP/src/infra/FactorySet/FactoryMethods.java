package infra.FactorySet;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public class FactoryMethods {
	
	public  ArrayList<HashMap<String, Object>> resultSetToArrayList(ResultSet rs) throws SQLException{

		ResultSetMetaData md = rs.getMetaData();
		int columns = md.getColumnCount();
		ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();

		while (rs.next()){
			HashMap<String, Object> row = new HashMap<String, Object>(columns);
			for(int i=1; i<=columns; ++i){           
				row.put(md.getColumnName(i),rs.getObject(i));
			}
			list.add(row);
		}

		return list;
	}
}
