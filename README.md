################## Steps to set up the project ##################

1. Docker should be installed on your machine.
2. Clone or download the docker-compose.yml file present in the repository.
3. You could see 3 services "db","app" and "carfrontend" you will have to make some configurations to run it please refer below steps.
4. In "db" inside environment add password for mysql and name of the database
		MYSQL_ROOT_PASSWORD: root
		MYSQL_DATABASE: gamedb
5. In "app" inside environment you will need to add the URL, Username, Password and Server port to start the backend service.
		SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/gamedb
		SPRING_DATASOURCE_USERNAME=root
		SPRING_DATASOURCE_PASSWORD=root
		SERVER_PORT=8087
		
	After this inside "ports" you need to map the ports for the application
		"8087:8087"
	
	Note - Please note that what ever SERVER_PORT you have chosen that should match with the "ports". Application will not run if there are misconfiguration.

6. In "carfrontend" inside build->args section you will need to pass the endpoint where your backend is running in this case it on "http://localhost:8087"
		REACT_APP_HOST_IP_ADDRESS=http://localhost:8087
	
	Note - Make sure the port in endpoint is same as mentioned in step 5.

7. Cross verify if you done everything correctly
8. Open cmd in the directory where the docker-compose.yml file is present and make sure your docker deamon is running and enter the command mentioned below.
		docker compose up --build -d
		
9. Once docker pulls all the images you can access your application on "http://localhost:3000"


################## Check Project Car.docx file for more info ##################
