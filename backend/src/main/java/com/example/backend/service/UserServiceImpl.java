package com.example.backend.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final UserFactory factory; // Added Factory
    private final PasswordStrategy passwordStrategy; // Added Strategy

    public UserServiceImpl(UserRepository repo,
                           UserFactory factory,
                           @Qualifier("simpleStrategy") PasswordStrategy passwordStrategy) {
        this.repo = repo;
        this.factory = factory;
        this.passwordStrategy = passwordStrategy;
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
    public UserEntity saveUser(UserEntity rawUser) {
        // 1. Use Factory to create the entity (Creational Pattern)
        UserEntity formattedUser = factory.createNewUser(rawUser);

        // 2. Use Strategy to handle the password (Behavioral Pattern)
        String securedPassword = passwordStrategy.process(formattedUser.getPassword());
        formattedUser.setPassword(securedPassword);

        return repo.save(formattedUser);
    }
}
