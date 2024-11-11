package com.CyberArtwork.CyberArtworkBackend.services;

import com.CyberArtwork.CyberArtworkBackend.exceptions.InvalidCredentialsException;
import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user){
        userRepository.save(user);
    }

    public User validateUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new InvalidCredentialsException("El correo electrónico no está registrado"));

        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("La contraseña es incorrecta");
        }

        return user;
    }
}
