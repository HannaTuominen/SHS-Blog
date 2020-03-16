package fi.tuni.shs.Blog.Platform;

import org.springframework.data.repository.CrudRepository;

public interface SHSDatabase extends CrudRepository<BlogPost, Long> {
}
