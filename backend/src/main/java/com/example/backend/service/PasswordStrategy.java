package com.example.backend.service;

public interface PasswordStrategy {
    String process(String password);
}
