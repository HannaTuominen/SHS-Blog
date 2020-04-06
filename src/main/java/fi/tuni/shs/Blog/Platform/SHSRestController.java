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

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RestController
public class SHSRestController {

    @Autowired
    BlogPostRepository blogPostRepository;

    @Autowired
    BlogCommentRepository blogCommentRepository;

    @RequestMapping(value = "api/add/", method = RequestMethod.POST)
    public ResponseEntity<Void> add(@RequestBody BlogPost post, UriComponentsBuilder b) {
        blogPostRepository.save(post);
        UriComponents uriComponents = b.path("api/get/{id}").buildAndExpand(post.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
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
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "api/addComment/", method = RequestMethod.POST)
    public ResponseEntity<Void> addComment(@RequestBody BlogComment comment, UriComponentsBuilder b) {
        blogCommentRepository.save(comment);
        UriComponents uriComponents = b.path("api/get/{id}").buildAndExpand(comment.getId());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping("/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }

    @RequestMapping("test/")
    public void CreateTestPosts() {
        Date date = new Date();
        long parentPost = 1;
        blogPostRepository.save(new BlogPost("Hello 1", "Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat."));
        blogPostRepository.save(new BlogPost("Hello 2", "Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat."));
        blogPostRepository.save(new BlogPost("Hello 3", "Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat."));
        blogPostRepository.save(new BlogPost("Hello 4", "Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat."));
        blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme", date, parentPost, 0));
        blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme", date, parentPost,0));
        blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme", date, parentPost,0));
        blogCommentRepository.save(new BlogComment("Jussi", "Hellurei on kommenttimme", date, parentPost,0));
    }
}
