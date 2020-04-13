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

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("admin").password(passwordEncoder().encode("admin")).roles("ADMIN").authorities("ADMIN_AUTH");
    }

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

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
