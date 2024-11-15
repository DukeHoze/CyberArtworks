package com.CyberArtwork.CyberArtworkBackend.services;

import com.CyberArtwork.CyberArtworkBackend.models.Artwork;
import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.repository.ArtworkRepository;
import com.CyberArtwork.CyberArtworkBackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;

    @Autowired
    public ArtworkService(ArtworkRepository artworkRepository, UserRepository userRepository) {
        this.artworkRepository = artworkRepository;
        this.userRepository = userRepository;
    }

    @Value("${app.upload.dir}")
    private String uploadDir;

    public String saveArtwork(MultipartFile file, String title, String description, String author, Long userId) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + "/" + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        Artwork artwork = new Artwork(title, description, author, filePath, user);
        artworkRepository.save(artwork);

        return filePath;
    }

    public void deleteArtworkbyId(Long imageId) {
        if (!artworkRepository.existsById(imageId)) {
            throw new RuntimeException("Artwork not found with ID: " + imageId);
        }
        artworkRepository.deleteById(imageId);
    }

    public List<Artwork> getAllArtworks() {
        return artworkRepository.findAll();
    }

    @Transactional
    public String toggleFavorite(Long userId, Long imageId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Artwork artwork = artworkRepository.findById(imageId).orElseThrow(() -> new RuntimeException("Artwork not found"));

        if (user.getFavorite().contains(artwork)) {
            user.getFavorite().remove(artwork);
            return "Artwork removed from favorites";
        } else {
            user.getFavorite().add(artwork);
            return "Artwork added to favorites";
        }
    }
}
