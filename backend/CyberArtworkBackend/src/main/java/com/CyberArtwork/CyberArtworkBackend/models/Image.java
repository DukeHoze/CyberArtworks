package com.CyberArtwork.CyberArtworkBackend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Image() {}

    public Image(String name, String path, User user) {
        this.name = name;
        this.path = path;
        this.user = user; // Set the user
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
