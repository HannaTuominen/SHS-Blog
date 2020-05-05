package fi.tuni.shs.Blog.Platform;

import fi.tuni.shs.Blog.Platform.storage.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class BlogPlatformApplication {

	public static void main(String[] args) {
		System.out.println("Maija Visala, Hanna Tuominen, Viljami Pietarila");
		System.out.println("Commands that can be used for REST testing.");
		System.out.println("Necessary user name: admin / passwords: admin needed for testing");
		SpringApplication.run(BlogPlatformApplication.class, args);
	}


	private static Connection getConnection() throws URISyntaxException, SQLException {
		URI dbUri = new URI(System.getenv("DATABASE_URL"));

		String username = dbUri.getUserInfo().split(":")[0];
		String password = dbUri.getUserInfo().split(":")[1];
		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

		return DriverManager.getConnection(dbUrl, username, password);
	}
}
