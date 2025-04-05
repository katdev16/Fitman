package com.fitman.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow specific origins (your frontend application URL)
        config.addAllowedOrigin("http://localhost:5000"); // Make sure this matches your frontend origin
        config.addAllowedOrigin("http://localhost:3000"); // If you have multiple environments, you can allow more origins
        
        // Allow headers and methods to be included in the request
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        // Allow credentials (cookies, HTTP authentication, etc.)
        config.setAllowCredentials(true);
        
        // Register CORS configuration for all API paths ("/**")
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // Return the CorsFilter object
        return new CorsFilter(source);
    }
}
