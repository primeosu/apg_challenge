# Intel Security Programming Challenge Implementation
Author: Kyle Berger, Date: 8/8/2016, Email: Kyle.msn@live.com
This implementation uses the following technologies that you will need to set up: Maven, MySql, and Apache Tomcat 7

## Build Project using Maven
Install java:  
If Java is not currently installed on your machine, or if your JAVA\_HOME variable is not set, please enter the following commands into the terminal: For additional information in this section you may refer to the documentation at https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get.  
  
1. This command will make sure your packages are up to date.  
    sudo apt-get update  
  
1. This command will check your current java version.  
    java -version  

1. These commands will install java.  
    sudo apt-get install default-jre  
    sudo apt-get install default-jdk  

1. This command will give you the path or paths to your current java installations.  
    sudo update-alternatives --config java
  
1. Update your JAVA\_HOME variable by running this command using the nano editor.  
    sudo nano /etc/environment  
  
1. Here is an example of the path to put into JAVA\_HOME.  
    JAVA\_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java"  
  
Install Maven:  

1. If Maven is not current installed on your machine, navigate to https://maven.apache.org/download.cgi to download the Binary tar.gz archive "apache-maven-3.3.9-bin.tar.gz". Then, enter the following command:   
    sudo apt install maven

1. Navigate to your installation directory (Desktop in this example) and build project using maven.  
    cd Desktop/challenge/  
    mvn clean install  

1. Finally, Navigate to your installation target directory and rename the war file to Challenge.war.  

## Install MySql
1. Navigate to http://dev.mysql.com/downloads/mysql/ on your browser and download the "Linux - Generic (glibc 2.5) (x86, 64-bit), Compressed TAR Archive". You will need to log in using your oracle account. If you do not have an oracle account please create one.
1. Open up the terminal and input the following commands: You may need to run them as sudo. For additional information in this section you may refer to the documentation at dev.mysql.com/doc/refman/5.7/en/binary-installation.html   
    sudo groupadd mysql  
    sudo useradd -r -g mysql -s /bin/false mysql  
    cd /usr/local  

1. The following command will unpack the tar.gz file that you downloaded earlier. In this example the tar.gz file is located in the downloads folder.  
    sudo tar zxvf /home/username/Downloads/mysql-5.7.14-linux-glibc2.5-x86\_64.tar.gz  

1. This command will create an alias mysql for the current location  
    sudo ln -s /usr/local/mysql-5.7.14-linux-glibc2.5-x86\_64 mysql  

1. If you do not have libaio installed you will need to install it with the following command.  
    sudo apt-get install libaio1  

1. The following commands will setup your mysql database  
    cd mysql  
    sudo mkdir mysql-files  
    sudo chmod 750 mysql-files  
    sudo chown -R mysql .  
    sudo chgrp -R mysql .  

1. After running this command make sure you to save your temporary root password. You will need it later.  
    sudo bin/mysqld --initialize --user=mysql  

1. Run these commands to set up your private and public keys, and finish the installation of the mysql database.  
    sudo bin/mysql\_ssl\_rsa\_setup  
    sudo chown -R root .  
    sudo chown -R mysql data mysql-files  
    sudo bin/mysqld\_safe --user=mysql &  
    sudo cp support-files/mysql.server /etc/init.d/mysql.server  

1. Run this command to allow you to run mysql commands from any directory.  
    export PATH=$PATH:/usr/local/mysql/bin  

1. Log into mysql by entering the password you saved earlier.  
    mysql -u root -p  

1. Once logged in, run this command to remove the password for the root user.  
    SET PASSWORD FOR root@localhost=PASSWORD('');  
    exit;  

1. Finally, initialize your database and tables with the following commands. This example assumes that you have your files stored on the desktop.
The sql commands are located in the src > main > res folder.  
    mysql -u root < "/home/user/Desktop/challenge/src/res/create_database.sql"  
    mysql -u root challenge < "/home/user/Desktop/challenge/src/res/create_table.sql"  

## Install Apache Tomcat 7
1. In order to run the application, we need to run the war file we created on a tomcat server with the context root /Challenge. Run the following command to install Apache Tomcat 7. For help in this section refer to https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-7-on-ubuntu-14-04-via-apt-get.  
    sudo apt-get install tomcat7

1. Next we need to change some of the default parameters that are installed with tomcat.  Change the JAVA\_OPTS field to the following using the nano editor.  
    sudo nano /etc/default/tomcat7  
    JAVA\_OPTS="-Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true -Xmx512m -XX:MaxPermSize=256m -XX:+UseConcMarkSweepGC"  

1. Restart the server to update with your changes.  
    sudo service tomcat7 restart

1. Next we will install the tomcat server admin portal to make uploading the war file easy.  
    sudo apt-get install tomcat7-admin

1. In order to use the admin portal we need to create a user in tomcat-users.xml.  Replace the <tomcat-users> block with the folling using the nano editor.  
    sudo nano /etc/tomcat7/tomcat-users.xml  
    <tomcat-users>  
        <user username="admin" password="1234" roles="manager-gui,admin-gui"/>  
    </tomcat-users>  

1. Restart the server to update with your changes.  
    sudo service tomcat7 restart

1. Now that we have the admin portal started, navigate to http://localhost:8080/manager/html. Once there scroll down and click on "Select WAR file to upload". Load in the Challenge.war under /challenge/target and hit deploy.

1. The war should show up near the top as /Challenge. You can click on /Challenge to visit the application or visit http://localhost:8080/Challenge/.

## Other

1. If you need to wipe the database, just rerun the following command:  
mysql -u root challenge < "/home/user/Desktop/challenge/src/res/create\_table.sql"  

2. If you have any questions on any of the above steps please email me at Kyle.msn@live.com.