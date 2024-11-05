package com.CyberArtwork.CyberArtworkBackend.controllers;

import com.CyberArtwork.CyberArtworkBackend.models.User;
import com.CyberArtwork.CyberArtworkBackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/user/registro")
    public ResponseEntity<Map<String, Object>>createUser(@RequestBody User usuario) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Usuario creado");
        respuesta.put("exito", true);
        userService.createUser(usuario);
        return ResponseEntity.ok(respuesta);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping ("/user/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("mensaje", "Usuario creado");
        boolean existe =userService.validateUser(user);
        System.out.println("Usuario" + user.getEmail());
        if (!existe) {
            System.out.println("Ha funcionado");
            respuesta.put("mensaje", "No existe el usuario");
        }
        return ResponseEntity.ok(respuesta);
    }
}
