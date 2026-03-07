package com.example.backend.service;

import org.springframework.stereotype.Service;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public UserEntity getUserById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return repo.save(user); // This works now
    }
}