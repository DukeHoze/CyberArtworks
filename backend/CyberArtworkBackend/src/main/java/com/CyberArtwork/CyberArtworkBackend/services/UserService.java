package com.CyberArtwork.CyberArtworkBackend.services;

import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    public boolean validateUser(User user){
         User retrievedUser= userRepository.findByEmail(user.getEmail());
        System.out.println(user.getEmail());
        System.out.println(retrievedUser.getName() + "bazinga");
         if (Objects.equals(retrievedUser.getPassword(), user.getPassword()) && Objects.equals(retrievedUser.getEmail(), user.getEmail())) {
            return true;
         }
         else {
             return false;
         }

    }
}
