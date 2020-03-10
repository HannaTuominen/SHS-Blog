package fi.tuni.shs.Blog.Platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Date;

@SpringBootApplication
public class BlogPlatformApplication {

	public static void main(String[] args) {
		System.out.println("Maija Visala, Hanna Tuominen, Viljami Pietarila");
		System.out.println("Commands that can be used for REST testing.");
		System.out.println("Necessary user name: admin / passwords: admin needed for testing");
		System.out.println(System.getenv("JDBC_DATABASE_URL"));
		SpringApplication.run(BlogPlatformApplication.class, args);
		if (System.getenv("JDBC_DATABASE_URL") != null) {
			try {
				Connection connection = getConnection();
			} catch (URISyntaxException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	@RestController
	public class HelloController {
		@GetMapping("/api/hello")
		public String hello() {
			return "Hello, the time at the server is now " + new Date() + "\n";
		}
	}

	private static Connection getConnection() throws URISyntaxException, SQLException {
		String dbUrl = System.getenv("JDBC_DATABASE_URL");
		return DriverManager.getConnection(dbUrl);
	}
}
