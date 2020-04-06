package fi.tuni.shs.Blog.Platform;


import javax.persistence.*;
import java.util.Date;

@Entity
public class BlogComment {
    // primary key, autoincrement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private long id;
    private long parentPost;
    private String name;
    private String message;
    private Date time;
    private long thumbsUp;

    public BlogComment() {
    }

    public BlogComment(String name, String message, Date time, long parentPost, long thumbsUp) {
        setParentPost(parentPost);
        setName(name);
        setMessage(message);
        setTime(time);
        setThumbsUp(thumbsUp);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public long getParentPost() {
        return parentPost;
    }

    public void setParentPost(long parentPost) {
        this.parentPost = parentPost;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getThumbsUp() {
        return thumbsUp;
    }

    public void setThumbsUp(long thumbsUp) {
        this.thumbsUp = thumbsUp;
    }

    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", message='" + message + '\'' +
                ", time='" + time + '\'' +
                ", thumbsUp='" + thumbsUp + '\'' +
                '}';
    }

}

