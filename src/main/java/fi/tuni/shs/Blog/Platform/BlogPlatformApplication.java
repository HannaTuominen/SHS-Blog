package fi.tuni.shs.Blog.Platform;

import fi.tuni.shs.Blog.Platform.storage.FileStorageProperties;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

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
		System.out.println("	curl -X GET http://localhost:8080/api/get/");
		System.out.println("GET one post.");
		System.out.println("	curl -X GET http://localhost:8080/api/get/1");
		System.out.println("GET comments of one post.");
		System.out.println("	curl -X GET http://localhost:8080/api/getComments/1");
		System.out.println("GET log data.");
		System.out.println("	curl -X GET http://localhost:8080/api/getLogs/");
		System.out.println("GET posts title and id data.");
		System.out.println("	curl -X GET http://localhost:8080/api/getAllPosts/");
		System.out.println("GET time and greeting from server.");
		System.out.println("	curl -X GET http://localhost:8080/api/hello");
		System.out.println("POST a post.");
		System.out.println("	curl -X POST --user admin:admin -H \"Content-type: application/json\" " +
				"-d '{\"body\":\"post body\", \"title\":\"post title\"}' 'http://localhost:8080/api/add/'");
		System.out.println("POST a comment.");
		System.out.println("	curl -XPOST --user admin:admin -H \"Content-type: application/json\" -d " +
				"'{\"parentPost\": 1, \"name\":\"commentor name\", \"message\": \"comment message\", " +
				"\"time\": 1000, \"thumbsUp\": \"5\"}' 'http://localhost:8080/api/addComment/'");
		System.out.println("POST thumbs up to one comment.");
		System.out.println("	curl -X POST --user admin:admin http://localhost:8080/api/thumbsUp/1");
		System.out.println("POST thumbs down to one comment.");
		System.out.println("	curl -X POST --user admin:admin http://localhost:8080/api/thumbsDown/1");
		System.out.println("DELETE one post.");
		System.out.println("	curl -X DELETE --user admin:admin http://localhost:8080/api/delete/1");
		System.out.println("DELETE one comment.");
		System.out.println("	curl -X DELETE --user admin:admin http://localhost:8080/api/deleteComment/1");
		System.out.println("Necessary user name: admin / passwords: admin needed for testing");
	}
}
