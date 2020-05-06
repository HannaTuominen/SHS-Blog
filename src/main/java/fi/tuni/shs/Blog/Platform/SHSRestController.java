package fi.tuni.shs.Blog.Platform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RestController
public class SHSRestController implements CommandLineRunner {

    @Autowired
    BlogPostRepository blogPostRepository;

    @Autowired
    BlogCommentRepository blogCommentRepository;

    @Autowired
    LogRepository logRepository;

    @RequestMapping(value = "api/add/", method = RequestMethod.POST)
    public ResponseEntity<Void> add(@RequestBody BlogPost post, UriComponentsBuilder b) {
        blogPostRepository.save(post);
        UriComponents uriComponents = b.path("api/get/{id}").buildAndExpand(post.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        createLogEntry("created comment id: " + post.getId());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping("api/getLogs")
    public ResponseEntity<Iterable<LogEntry>> getLogs() {
        return new ResponseEntity<>(logRepository.findAll(), HttpStatus.CREATED);
    }

    @RequestMapping("api/get/")
    public ResponseEntity<Iterable<BlogPost>> getAll() {
        return new ResponseEntity<>(blogPostRepository.findAll(), HttpStatus.CREATED);
    }

    @RequestMapping("api/get/{postId}")
    public ResponseEntity<BlogPost> get(@PathVariable long postId) {
        Optional<BlogPost> blogPost = blogPostRepository.findById(postId);
        if (blogPost.isPresent()) {
            return new ResponseEntity<>(blogPost.get(), HttpStatus.CREATED);
        } else {
            System.out.println("ResponseEntity get error");
            return null;
        }
    }

    @RequestMapping(value = "/api/delete/{postId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable long postId) {
        blogPostRepository.deleteById(postId);

        createLogEntry("deleted comment id: " + postId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping("api/getComments/{postId}")
    public ResponseEntity<Iterable<BlogComment>> getComments(@PathVariable long postId) {
        return new ResponseEntity<>(blogCommentRepository.findByParentPost(postId), HttpStatus.CREATED);
    }

    @RequestMapping("api/getAllPosts/")
    public ResponseEntity<Iterable<Object>> getAllPosts() {
        return new ResponseEntity<>(blogPostRepository.getAllBlogPostTitle(), HttpStatus.CREATED);
    }

    @RequestMapping("api/deleteComment/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable long commentId) {
        blogCommentRepository.deleteById(commentId);

        createLogEntry("deleted comment id: " + commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "api/addComment/", method = RequestMethod.POST)
    public ResponseEntity<Void> addComment(@RequestBody BlogComment comment, UriComponentsBuilder b) {
        blogCommentRepository.save(comment);
        UriComponents uriComponents = b.path("api/get/{id}").buildAndExpand(comment.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        createLogEntry("created comment id: " + comment.getId());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "api/thumbsUp/{commentId}")
    public ResponseEntity<Void> addThumbsUp(@PathVariable long commentId) {
        changeThumbs(commentId, + 1);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "api/thumbsDown/{commentId}")
    public ResponseEntity<Void> addThumbsDown(@PathVariable long commentId) {
        changeThumbs(commentId, - 1);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void changeThumbs(long commentId, long value) {
        BlogComment commentInDB = blogCommentRepository.findById(commentId).get();
        long thumbs = commentInDB.getThumbsUp() + value;
        commentInDB.setThumbsUp(thumbs);
        blogCommentRepository.save(commentInDB);
    }

    @RequestMapping("/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }

    private void createLogEntry(String message) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        LogEntry entry = new LogEntry(dtf.format(now) + ": " + message);

        logRepository.save(entry);
    }

    @RequestMapping("test/")
    public void createTestPosts() {
        Date date = new Date();
        String postText = "Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, " +
                "sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, " +
                "kielelleni kerkiävät, hampahilleni hajoovat.";
        blogPostRepository.save(new BlogPost("Hello 1", "Post 1: " + postText));
        blogPostRepository.save(new BlogPost("Hello 2", "Post 2: " + postText));
        blogPostRepository.save(new BlogPost("Hello 3", "Post 3: " + postText));
        blogPostRepository.save(new BlogPost("Hello 4", "Post 4: " + postText));
        for (long parentPost = 1; parentPost < 5; parentPost++) {
            blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme " + parentPost, date, parentPost, 0));
            blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme " + parentPost, date, parentPost, 0));
            blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme " + parentPost, date, parentPost, 0));
            blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme " + parentPost, date, parentPost, 0));
        }
        createLogEntry("create testPosts");
    }

    @Override
    public void run(String... args) throws Exception {
        createTestPosts();
    }
}
