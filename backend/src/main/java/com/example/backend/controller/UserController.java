package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.service.UserService;
import com.example.backend.entity.UserEntity;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserEntity> getAll() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserEntity getById(@PathVariable Integer id) {
        return service.getUserById(id);
    }
}