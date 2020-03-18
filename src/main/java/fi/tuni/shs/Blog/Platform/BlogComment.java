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
    private String comment;
    private Date time;

    public BlogComment() {
    }

    public BlogComment(String name, String comment, Date time, long parentPost) {
        setParentPost(parentPost);
        setName(name);
        setComment(comment);
        setTime(time);
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", time='" + time + '\'' +
                '}';
    }

}

