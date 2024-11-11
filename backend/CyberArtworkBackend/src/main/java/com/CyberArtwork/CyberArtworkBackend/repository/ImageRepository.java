package com.CyberArtwork.CyberArtworkBackend.repository;

import com.CyberArtwork.CyberArtworkBackend.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
