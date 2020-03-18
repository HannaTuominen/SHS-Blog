package fi.tuni.shs.Blog.Platform;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {
    // primary key, autoincrement
    @Id
    @GeneratedValue
    long id;
    String name;
    String comment;
    String time;

    public Comment() {
    }

    public Comment(String name, String comment, String time) {
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String toString() {
        return "id: " + id + " Name: " + getName();
    }

}

