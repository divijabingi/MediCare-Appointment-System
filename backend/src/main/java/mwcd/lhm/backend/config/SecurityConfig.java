package mwcd.lhm.backend.config;

import mwcd.lhm.backend.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors()
                .and()
                .csrf().disable()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()

                .authorizeRequests()

                // Public APIs
                .antMatchers(
                        "/client/auth/**",
                        "/admin/login",
                        "/jwt/**"
                ).permitAll()

                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Doctor APIs
                .antMatchers(HttpMethod.GET, "/doctor/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_CLIENT")

                .antMatchers(HttpMethod.POST, "/doctor/**")
                .hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.PUT, "/doctor/**")
                .hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.DELETE, "/doctor/**")
                .hasAuthority("ROLE_ADMIN")

                // Client Profile
                .antMatchers("/client/profile/**")
                .hasAuthority("ROLE_CLIENT")

                // Appointment APIs
                .antMatchers("/appointment/**")
                .authenticated()

                // Medical Record APIs
                .antMatchers("/medical-record/**")
                .authenticated()

                .anyRequest().authenticated();

        http.addFilterBefore(
                jwtRequestFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:3000"));

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        configuration.setAllowedHeaders(
                List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}