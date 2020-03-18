package fi.tuni.shs.Blog.Platform;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogCommentRepository extends CrudRepository<BlogComment, Long> {
    List<BlogComment> findByParentPost(long parentPost);
}
