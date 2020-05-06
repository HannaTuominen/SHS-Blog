package fi.tuni.shs.Blog.Platform.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The BasicAuthenticationController class is used to in controlling the login for the user via basic auth.
 *
 * The class is created when a new authentication bean is needed to login.
 * 
 * @author Hanna Tuominen
 * @version 3.0
 * @since 2020-03-05
 */
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:8080" })
@RestController
public class BasicAuthenticationController {

    /**
     *  Method returns a new authentication bean
     * 
     * @return new authentication bean for login
     */
    @GetMapping(path = "/basicauth")
    public AuthenticationBean authenticate() {
        //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
        return new AuthenticationBean("You are authenticated");
    }
}
