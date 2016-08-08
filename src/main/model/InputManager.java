package main.model;

import java.sql.Connection;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Scanner;

import main.dao.Database;
import main.dao.InputDao;
import main.dto.InputObject;


/**
 * Manages the connection to the database from the java application.
 * @author Kyle Berger
 */
public class InputManager {
	/**
	 * Creates a connection to the database.
	 * @return Creates an InputDao object to retrieve an ArrayList of InputObject(s) to return.
	 * @throws Exception
	 */
	public ArrayList<InputObject> GetData()throws Exception {
		ArrayList<InputObject> inputs = null;
		try {
			Database database= new Database();
			Connection connection = database.Get_Connection();
			InputDao inputDao= new InputDao();
			inputs = inputDao.GetInput(connection);
		}
		catch (Exception e) {
			throw e;
		}
		return inputs;
	}
	
	/**
	 * Creates a connection to the database in order to post CSV data into the database using INSERT SQL statements.
	 * @param inputString contains CSV File data.
	 * @throws Exception
	 */
	public void PostData(String inputString)throws Exception {
		try {
			Database database= new Database();
			Connection connection = database.Get_Connection();
			Statement statement = connection.createStatement();
			Scanner scanner = new Scanner(inputString);
	  		
	  		//skip the first line
	  		String line = scanner.nextLine();
	  		while (scanner.hasNextLine()) {
	  		  line = scanner.nextLine();
	  		  String[] input = line.split(",");
	  		  String m = input[0];
	  		  if(m.startsWith("0x")){
	  			  m = m.substring(2);
	  		  }
	  		  // process the line	
	  		  statement.executeUpdate("INSERT INTO input(md5,classification_name,classification_type,size,file_type) " +
	  		  		  "VALUES (UNHEX('"+m+"'),'"+input[1]+"','"+input[2]+"','"+input[3]+"','"+input[4]+"')");
	  		
	  		}
	  		scanner.close();
			// insert the data
	  		//INSERT INTO input(md5,classification_name,classification_type,size,file_type)
	  	    //-> VALUES (UNHEX('962B49E6E03493E7C2C65ABDE0A26F90'),'Downloader','trojan',6604,'exe');
		}
		catch (Exception e) {
			throw e;
		}
	}
}
