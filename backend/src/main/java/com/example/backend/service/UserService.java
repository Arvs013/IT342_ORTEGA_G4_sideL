package com.example.backend.service;

import com.example.backend.entity.UserEntity;
import java.util.List;

public interface UserService {

    List<UserEntity> getAllUsers();

    UserEntity getUserById(Integer id);

    UserEntity saveUser(UserEntity user);

    UserEntity login(String email, String password);
}