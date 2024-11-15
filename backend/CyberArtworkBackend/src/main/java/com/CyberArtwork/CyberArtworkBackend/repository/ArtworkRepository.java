package com.CyberArtwork.CyberArtworkBackend.repository;

import com.CyberArtwork.CyberArtworkBackend.models.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
}
