package fi.tuni.shs.Blog.Platform.basic.auth;
/**
 * The AuthenticationBean class is used to in give out messages whether authentication was successful or not.
 *
 * 
 * @author Hanna Tuominen
 * @version 3.0
 * @since 2020-03-05
 */

public class AuthenticationBean {

    /**
     * the message to be returned
     */
    private String message;

    /**
     * Constructor the create a message
     */
    public AuthenticationBean(String message) {
        this.message = message;
    }

    /**
     * getter for the string message
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * setter to set the current message
     * @param message the message to be set and displayed
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * to string to show the string version of the message
     */
    @Override
    public String toString() {
        return String.format("authenticationBean ", message);
    }
}
