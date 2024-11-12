package com.CyberArtwork.CyberArtworkBackend.controllers;

import com.CyberArtwork.CyberArtworkBackend.models.Image;
import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/signup")
    public ResponseEntity<Map<String, Object>>createUser(@RequestBody User usuario) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Usuario creado");
        respuesta.put("exito", true);
        userService.createUser(usuario);
        return ResponseEntity.ok(respuesta);
    }

    @PostMapping("/user/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        User loggedUser = userService.validateUser(user.getEmail(), user.getPassword());

        Set<Long> favoriteImageIds = loggedUser.getFavorite().stream()
                .map(Image::getId)
                .collect(Collectors.toSet());

        Map<String, Object> response = Map.of(
                "userId", loggedUser.getId(),
                "name", loggedUser.getName(),
                "email", loggedUser.getEmail(),
                "isAdmin", loggedUser.getAdmin(),
                "favoriteImageIds", favoriteImageIds
        );

        return ResponseEntity.ok(response);
    }
}
