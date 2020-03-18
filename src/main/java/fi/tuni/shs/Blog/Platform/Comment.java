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
    long id;
    String name;
    String comment;
    Date time;

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

    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", time='" + time + '\'' +
                '}';
    }

}

