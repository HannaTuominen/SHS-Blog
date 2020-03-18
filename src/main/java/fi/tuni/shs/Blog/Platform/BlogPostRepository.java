package fi.tuni.shs.Blog.Platform;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {
    @Query("select post.title, post.id from BlogPost post")
    public Iterable<Object> getAllBlogPostTitle();
}
