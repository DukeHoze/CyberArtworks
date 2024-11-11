package com.CyberArtwork.CyberArtworkBackend.controllers;

import com.CyberArtwork.CyberArtworkBackend.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("userId") Long userId) {
        try {
            String filePath = imageService.saveImage(file, userId);
            return ResponseEntity.ok("Imagen subida exitosamente: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir la imagen");
        }
    }

    @PostMapping("/favorite")
    public ResponseEntity<String> toggleFavorite(@RequestParam("userId") Long userId,
                                                 @RequestParam("imageId") Long imageId) {
        try {
            String response = imageService.toggleFavorite(userId, imageId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable("id") Long imageId) {
        try {
            imageService.deleteImageById(imageId);
            return ResponseEntity.ok("Image deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
