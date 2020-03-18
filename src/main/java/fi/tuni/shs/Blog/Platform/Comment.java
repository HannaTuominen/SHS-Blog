package fi.tuni.shs.Blog.Platform;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Comment {
    // primary key, autoincrement
    @Id
    @GeneratedValue
    private long id;
    private long parentPost;
    private String name;
    private String comment;
    private Date time;

    public Comment() {
    }

    public Comment(String name, String comment, Date time) {
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

    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", time='" + time + '\'' +
                '}';
    }

}

