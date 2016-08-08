package main.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import main.dto.InputObject;

/**
 * Select data from the database and convert to DTO form using the InputObject class.
 * @author Kyle Berger
 */
public class InputDao {
	
	/**
	 * @param connection
	 * @return an arraylist containing all the input objects in the database. may be empty.
	 * @throws Exception
	 */
	public ArrayList<InputObject> GetInput(Connection connection) throws Exception {
		
		//create array list to return
		ArrayList<InputObject> inputData = new ArrayList<InputObject>();
		try{
			
			//execute statement to fetch data from the database
			PreparedStatement ps = connection.prepareStatement("SELECT hex(md5), classification_name, classification_type, size, file_type FROM input ORDER BY hex(md5) ASC");
			ResultSet rs = ps.executeQuery();
			
			//while there are rows left to parse through
			while(rs.next()){
				
				//create a new input object (java is ~ pass by reference) and assign values
				InputObject inputObject = new InputObject();
				inputObject.setMd5(rs.getString("hex(md5)"));
				inputObject.setClassification_name(rs.getString("classification_name"));
				inputObject.setClassification_type(rs.getString("classification_type"));
				inputObject.setSize(rs.getInt("size"));
				inputObject.setFile_type(rs.getString("file_type"));
				
				//add input object to the list
				inputData.add(inputObject);
			}
			
			//return Array list of input objects
			return inputData;
		}
		catch(Exception e)
		{
		throw e;
		}
	}
}
