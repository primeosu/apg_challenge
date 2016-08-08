package main.webService;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.TreeMap;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import main.dto.InputObject;
import main.model.InputManager;


/**
 * Handles rest calls from the UI application.
 * @author Kyle Berger
 */
@Path("/rest")
public class RestService {
	 
	  /**
	 * @return a response to the UI containing the data currently in the database, or 'empty'.
	 * @throws JSONException
	 */
	@GET
	  @Path("/getInput")
	  @Produces("application/json")
	  public Response getInput() throws JSONException {
		  String result = "";
		  try{
			  
			  //create an input manager to begin the database reading process
			  InputManager inputManager = new InputManager();
			  //retrieve input objects from the input manager
			  ArrayList<InputObject> inputs = inputManager.GetData();
			  
			  //if there is nothing in the database, return 'empty'
			  if(inputs.size() == 0){
				  return Response.status(200).entity("empty").build();
			  }
			  
			  //build main json object
			  JSONObject data = new JSONObject();
			  
			  //build array for table field
			  JSONArray array = new JSONArray();
			  JSONObject item;
			  
			  //build maps to store counts for each column
			  TreeMap<String,Integer> ctypes = new TreeMap<String,Integer>();
			  TreeMap<String,Integer> cnames = new TreeMap<String,Integer>();
			  TreeMap<String,Integer> ftypes = new TreeMap<String,Integer>();
			  String value = "";
			  
			  //iterate through response objects create counts
			  for(InputObject i : inputs){
				  item = new JSONObject();
				  //assign md5 value
				  item.put("md5", "0x"+i.getMd5());
				  
				  
				  //load classification name
				  value = i.getClassification_name();
				  //add 1 if classification name exists, otherwise set to 1
				  if(cnames.containsKey(value)){
					  cnames.put(value, cnames.get(value) + 1);
				  }
				  else{
					  cnames.put(value, 1);
				  }
				  //assign classification name value
				  item.put("cname", value);
				  
				  
				  //load classification type
				  value = i.getClassification_type();
				  //add 1 if classification type exists, otherwise set to 1
				  if(ctypes.containsKey(value)){
					  ctypes.put(value, ctypes.get(value) + 1);
				  }
				  else{
					  ctypes.put(value, 1);
				  }
				  //assign classification type value
				  item.put("ctype", value);
				  
				  
				  //assign size value
				  item.put("size", i.getSize());
				  
				  
				  //load file type
				  value = i.getFile_type();
				  //add 1 if file type exists, otherwise set to 1
				  if(ftypes.containsKey(value)){
					  ftypes.put(value, ftypes.get(value) + 1);
				  }
				  else{
					  ftypes.put(value, 1);
				  }
				  //assign file type value
				  item.put("ftype", value);
				  
				  
				  //load object into array
				  array.put(item);
			  }
			  
			  //load table array into data object
			  data.put("table", array);
			  //loop through ctypes to build classification types data
			  JSONArray names = new JSONArray();
			  JSONArray values = new JSONArray();
			  int max = -1;
			  for(String s : ctypes.keySet()){
				  names.put(s);
				  int val = ctypes.get(s);
				  values.put(val);
				  max = Math.max(max, val);
			  }
			  
			  //load in classification types data
			  data.put("summary_names", names);
			  data.put("summary_values", values);
			  data.put("summary_max", max);
			  
			  //loop through cnames to build classification types data
			  names = new JSONArray();
			  values = new JSONArray();
			  for(String s : cnames.keySet()){
				  names.put(s);
				  values.put(cnames.get(s));
			  }
			  
			  //load in classification names data
			  data.put("bar_names", names);
			  data.put("bar_values", values);
			  
			  //loop through ftypes to build classification types data
			  names = new JSONArray();
			  values = new JSONArray();
			  for(String s : ftypes.keySet()){
				  names.put(s);
				  values.put(ftypes.get(s));
			  }
			  
			  //load in classification names data
			  data.put("pie_names", names);
			  data.put("pie_values", values);
			  
			  //set result to data object in string format
			  result = data.toString();
		  }
		  catch(Exception e)
		  {
			  System.out.println("Exception Error " + e); //Console 
		  }
		  
		  //return successful if no exceptions have been thrown
		  return Response.status(200).entity(result).build();
	  }

	  	/**
	  	 * @param uploadedInputStream
	  	 * @param fileDetail
	  	 * @return a successful response if data has been added to the database.
	  	 * @throws Exception
	  	 */
	  	@POST
		@Path("/upload")
		@Consumes(MediaType.MULTIPART_FORM_DATA)
		public Response uploadFile(
			@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) throws Exception {
	  		
	  		//convert input stream into string object
	  		String inputString = IOUtils.toString(uploadedInputStream, "UTF-8");
	  		
	  		//create input manager to post data to the database
	  		InputManager inputManager = new InputManager();
	  		
	  		//post the csv string into the database
	  		inputManager.PostData(inputString);
	  		
	  		//return successful if no exceptions have been thrown
	  		return Response.status(200).entity("success").build();

		}
	  
}