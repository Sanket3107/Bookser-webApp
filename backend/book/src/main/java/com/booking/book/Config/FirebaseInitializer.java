package com.booking.book.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class FirebaseInitializer {

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                // Load the service account key from classpath
                try (InputStream serviceAccount = new ClassPathResource("firebase-service-account.json").getInputStream()) {
                    FirebaseOptions options = FirebaseOptions.builder()
                            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                            .build();

                    FirebaseApp.initializeApp(options);
                    System.out.println("✅ Firebase initialized successfully!");
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("🔥 Failed to initialize Firebase: " + e.getMessage(), e);
        }
    }
}
