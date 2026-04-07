package com.example.backend.service;
import org.springframework.stereotype.Component;

@Component("simpleStrategy")
public class SimplePasswordStrategy implements PasswordStrategy {
    @Override
    public String process(String password) {
        return "[ENCRYPTED]" + password; // Simulating encryption logic
    }
}
