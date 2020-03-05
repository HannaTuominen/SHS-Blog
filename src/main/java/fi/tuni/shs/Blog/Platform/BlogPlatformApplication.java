package fi.tuni.shs.Blog.Platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@SpringBootApplication
public class BlogPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogPlatformApplication.class, args);
	}

	@RestController
	public class HelloController {
		@GetMapping("/api/hello")
		public String hello() {
			return "Hello, the time at the server is now " + new Date() + "\n";
		}
	}

}
