package fi.tuni.shs.Blog.Platform;

import org.springframework.data.repository.CrudRepository;

public interface LogRepository extends CrudRepository<LogEntry, Long> {
}
