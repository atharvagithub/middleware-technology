# Use an official OpenJDK runtime as a parent image
FROM openjdk:21

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/cars-0.0.1-SNAPSHOT.jar app.jar

# Expose the application's port
EXPOSE 8082

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]