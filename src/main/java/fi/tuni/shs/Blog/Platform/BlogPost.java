package fi.tuni.shs.Blog.Platform;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BlogPost {
    @Id
    @GeneratedValue
    private long id;

    private String body;
    private String title;

    public BlogPost() {
    }

    public BlogPost(String title, String body) {
        this.title = title;
        this.body = body;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "BlogPost{" +
                "id=" + id +
                ", body='" + body + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
