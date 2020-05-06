package fi.tuni.shs.Blog.Platform;

import fi.tuni.shs.Blog.Platform.storage.FileStorageProperties;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class BlogPlatformApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BlogPlatformApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Maija Visala, Hanna Tuominen, Viljami Pietarila");
		System.out.println("Curl commands");
		System.out.println("-------------");
		System.out.println("GET all posts.");
		System.out.println("curl -X GET http://localhost:8080/api/get/");
		System.out.println("GET one post.");
		System.out.println("curl -X GET http://localhost:8080/api/get/1");
		System.out.println("GET comments of one post.");
		System.out.println("curl -X GET http://localhost:8080/api/getComments/1");
		System.out.println("GET log data.");
		System.out.println("curl -X GET http://localhost:8080/api/getLogs/");
		System.out.println("GET posts title and id data.");
		System.out.println("curl -X GET http://localhost:8080/api/getAllPosts/");
		System.out.println("GET time and greeting from server.");
		System.out.println("curl -X GET http://localhost:8080/api/hello");
		System.out.println("Necessary user name: admin / passwords: admin needed for testing");
	}
}
