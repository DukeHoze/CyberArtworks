package com.CyberArtwork.CyberArtworkBackend.services;

import com.CyberArtwork.CyberArtworkBackend.models.Image;
import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.repository.ImageRepository;
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
public class ImageService {

    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @Value("${app.upload.dir}")
    private String uploadDir;

    public String saveImage(MultipartFile file, String title, String description, Long userId) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + "/" + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        Image image = new Image(title, description, filePath, user);
        imageRepository.save(image);

        return filePath;
    }

    public void deleteImageById(Long imageId) {
        if (!imageRepository.existsById(imageId)) {
            throw new RuntimeException("Image not found with ID: " + imageId);
        }
        imageRepository.deleteById(imageId);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    @Transactional
    public String toggleFavorite(Long userId, Long imageId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Image image = imageRepository.findById(imageId).orElseThrow(() -> new RuntimeException("Image not found"));

        if (user.getFavorite().contains(image)) {
            user.getFavorite().remove(image);
            return "Image removed from favorites";
        } else {
            user.getFavorite().add(image);
            return "Image added to favorites";
        }
    }
}
