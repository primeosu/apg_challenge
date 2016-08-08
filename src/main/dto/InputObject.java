package main.dto;

public class InputObject {
	private String md5;
	private String classification_name;
	private String classification_type;
	private int size;
	private String file_type;
	
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
	public String getClassification_name() {
		return classification_name;
	}
	public void setClassification_name(String classification_name) {
		this.classification_name = classification_name;
	}
	public String getClassification_type() {
		return classification_type;
	}
	public void setClassification_type(String classification_type) {
		this.classification_type = classification_type;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public String getFile_type() {
		return file_type;
	}
	public void setFile_type(String field_type) {
		this.file_type = field_type;
	}
	
}
