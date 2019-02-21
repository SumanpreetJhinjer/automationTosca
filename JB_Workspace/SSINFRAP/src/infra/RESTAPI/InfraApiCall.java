package infra.RESTAPI;


import infra.getDetails.*;

import javax.ws.rs.core.UriInfo;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.POST;

import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/api")
public class InfraApiCall {
	@Context 
	private UriInfo uri;
	
	@GET
	@Path("/hello")
	@Produces(MediaType.TEXT_PLAIN)
	  public String sayPlainTextHello() {
	    return "Hello Jersey";
	  }
	
	
	
	@POST
	@Path("/updateCleanMachineDetails")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<HashMap<String, Object>> updateCleanMachineDetails(HashMap details) throws FileNotFoundException, IOException {
		
		MachineDetails machine=new MachineDetails();
		String serverPath = uri.getBaseUri().toString();
		ArrayList<HashMap<String, Object>> machineDetails=machine.UpdateCleanMachineDetails(details,serverPath);
		return  machineDetails;
	  }
	
	
	
	
	
	/* FAQ's */
	@GET
	@Path("/questionAndAnswers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<HashMap<String, Object>> questionAndAnswers()  {
		
		FAQ faq=new FAQ();
		ArrayList<HashMap<String, Object>> questionAndAnswers=faq.getQandA();
		
		return  questionAndAnswers;
	}
	
	@GET
	@Path("/getEnvs")
	@Produces(MediaType.APPLICATION_JSON)
	  public ArrayList<HashMap<String, Object>> getEnvName() {
		UserDetails user=new UserDetails();
	    return user.getEnvName();
	  }
	@GET
	@Path("/getApps")
	@Produces(MediaType.APPLICATION_JSON)
	  public ArrayList<HashMap<String, Object>> getAppName() {
		UserDetails user=new UserDetails();
	    return user.getAppName();
	  }
	
	
	@POST
	@Path("/getEnvTypes")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	  public ArrayList<HashMap<String, Object>> getType(HashMap details) {
		UserDetails user=new UserDetails();
	    return user.getType(details);
	  }
}
