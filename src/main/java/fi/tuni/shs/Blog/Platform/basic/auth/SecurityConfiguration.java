package fi.tuni.shs.Blog.Platform.basic.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * The Security Configuration class is used to configure the HTTP basic auth.
 *
 * The security configuration is used to create configurations to the http basic auth and access
 * between backend and frontend.
 * 
 * @author Hanna Tuominen
 * @version 3.0
 * @since 2020-03-05
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * The default method for on configuring websecurityconfigurer adapter to create inmemory authentication
     * @param auth AuthenticationManagerBuilder to create auth
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("admin").password(passwordEncoder().encode("admin")).roles("ADMIN").authorities("ADMIN_AUTH");
    }

    /**
     * The default method for on configuring for on httpsecurity 
     * @param http HttpSecurity to be used
     */

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                //*************************
//                .antMatchers("/css/**", "/js/**", "/fonts/**", "/index").permitAll()
//                .antMatchers("/storage/**").permitAll()
                //**************************
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .antMatchers(HttpMethod.GET,"/**").permitAll()
//                .antMatchers("/edit").hasRole("ADMIN")
                .antMatchers("/test").permitAll()
//                .antMatchers("/login*").permitAll()
                .antMatchers("/api/getAllPosts/").permitAll()
                .antMatchers("/api/get/*").permitAll()
                .antMatchers("/api/getComments/**").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/api/addComment/*").permitAll()
                .antMatchers("/api/deleteComment/*").permitAll()
                .antMatchers("/api/thumbsDown/*").permitAll()
                .antMatchers("/api/thumbsUp/*").permitAll()
                .antMatchers("/api/downloadFile/").permitAll()
                .antMatchers("api/uploadFile/").permitAll()
                .antMatchers("/basicauth").permitAll()
                .anyRequest().authenticated()
//                .loginPage("/login");
                .and()
                .httpBasic();
    }

    /**
     * Password encoder to encrypt passwords
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
