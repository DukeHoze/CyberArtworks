package com.CyberArtwork.CyberArtworkBackend.repository;

import com.CyberArtwork.CyberArtworkBackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, Long> {
    //Para que si haya null no pete
    User findByEmail(String email);
}
