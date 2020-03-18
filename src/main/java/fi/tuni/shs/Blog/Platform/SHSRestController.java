package fi.tuni.shs.Blog.Platform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;
import java.util.Optional;


@RestController
public class SHSRestController {

    @Autowired
    SHSDatabase database;

    @RequestMapping(value = "add/", method = RequestMethod.POST)
    public ResponseEntity<Void> add(@RequestBody BlogPost post, UriComponentsBuilder b) {
        database.save(post);
        UriComponents uriComponents = b.path("/get/{id}").buildAndExpand(post.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping("get/")
    public ResponseEntity<Iterable<BlogPost>> getAll() {
        return new ResponseEntity<>(database.findAll(), HttpStatus.CREATED);
    }

    @RequestMapping("get/{postId}")
    public ResponseEntity<BlogPost> get(@PathVariable long postId) {
        Optional<BlogPost> blogPost = database.findById(postId);
        if (blogPost.isPresent()) {
            return new ResponseEntity<>(blogPost.get(), HttpStatus.CREATED);
        } else {
            System.out.println("ReponseEntity get error");
            return null;
        }
    }

    @RequestMapping(value = "delete/{postId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable long postId) {
        database.deleteById(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RestController
    public class HelloController {
        @GetMapping("/api/hello")
        public String hello() {
            return "Hello, the time at the server is now " + new Date() + "\n";
        }
    }
}