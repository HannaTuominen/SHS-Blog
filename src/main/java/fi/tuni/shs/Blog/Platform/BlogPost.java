package fi.tuni.shs.Blog.Platform;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
public class BlogPost {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "entity_id_seq"
    )
    @SequenceGenerator(
            name = "entity_id_seq",
            sequenceName = "global_id_sequence",
            allocationSize = 1
    )
    @Column(
            name = "id",
            unique = true,
            updatable = false,
            nullable = false
    )
    protected Long id;

    private String body;
    private String title;
    private String imgSrc;

    public BlogPost() {
    }

    public BlogPost(String title, String body, String imgSrc) {
        this.title = title;
        this.body = body;
        this.imgSrc = imgSrc;
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

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    @Override
    public String toString() {
        return "BlogPost{" +
                "id=" + id +
                ", body='" + body + '\'' +
                ", title='" + title + '\'' +
                ", imgSrc='" + imgSrc + '\'' +
                '}';
    }
}
