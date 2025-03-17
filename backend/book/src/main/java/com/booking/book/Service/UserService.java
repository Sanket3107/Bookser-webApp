package com.booking.book.Service;

import org.springframework.stereotype.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.booking.book.Repository.UserRepository;
import com.booking.book.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    public User createOrUpdateFirebaseUser(String firebaseUid, String email){
        User existingUser = userRepository.findByFirebaseUid(firebaseUid).orElse(null);
        if(existingUser != null) {
            // Optionally update email or other fields if necessary.
            existingUser.setEmail(email);
            logger.info("Updating existing Firebase user: {}", email);
            return userRepository.save(existingUser);
        }
        
        // Create a new user for Firebase login.
        User newUser = new User();
        newUser.setFirebaseUid(firebaseUid);
        newUser.setEmail(email);
        newUser.setRole("USER");
        // For Firebase-authenticated users, you may leave password null or set a default placeholder.
        newUser.setPassword(""); 
        logger.info("Creating new Firebase user: {}", email);
        return userRepository.save(newUser);
    }
    
    public List<User> getAllUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll();
    }

    public User updateRoleOfUser(String firebaseUid, String email) {
        return userRepository.findByFirebaseUid(firebaseUid).map(user -> {
            user.setRole("ADMIN");
            logger.info("Updating role of Firebase user: {}", email);
            return userRepository.save(user);
        })
        .orElseThrow(() -> new IllegalArgumentException("User not found with UID: " + firebaseUid));
    }

}
