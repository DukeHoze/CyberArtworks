package com.CyberArtwork.CyberArtworkBackend.controllers;

import com.CyberArtwork.CyberArtworkBackend.models.Artwork;
import com.CyberArtwork.CyberArtworkBackend.services.ArtworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
public class ArtworkController {

    private final ArtworkService artworkService;

    @Autowired
    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadArtwork(@RequestParam("file") MultipartFile file,
                                                           @RequestParam("title") String title,
                                                           @RequestParam("description") String description,
                                                           @RequestParam("author") String author,
                                                           @RequestParam("userId") Long userId) {
        try {
            String filePath = artworkService.saveArtwork(file, title, description, author, userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Obra subida exitosamente");
            response.put("filePath", filePath);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error al subir la obra."));
        }
    }

    /* @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("title") String title,
                                              @RequestParam("description") String description,
                                              @RequestParam("author") String author,
                                              @RequestParam("userId") Long userId) {
        try {
            String filePath = artworkService.saveImage(file, title, description, author, userId);
            return ResponseEntity.ok("Imagen subida exitosamente: " + filePath);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir la imagen");
        }
    }
    */
    @PostMapping("/favorite")
    public ResponseEntity<String> toggleFavorite(@RequestParam("userId") Long userId,
                                                 @RequestParam("imageId") Long imageId) {
        try {
            String response = artworkService.toggleFavorite(userId, imageId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllArtworks() {
        List<Artwork> artworks = artworkService.getAllArtworks();

        List<Map<String, Object>> response = artworks.stream()
                .map(image -> {
                    Map<String, Object> imageMap = new HashMap<>();
                    imageMap.put("title", image.getTitle());
                    imageMap.put("description", image.getDescription());
                    imageMap.put("id", image.getId());
                    imageMap.put("author", image.getAuthor());
                    imageMap.put("user", image.getUser().getName());
                    imageMap.put("path", image.getPath());
                    return imageMap;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArtwork(@PathVariable("id") Long imageId) {
        try {
            artworkService.deleteArtworkbyId(imageId);
            return ResponseEntity.ok("Artwork deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
