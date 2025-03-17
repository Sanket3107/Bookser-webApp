package com.booking.book.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.book.DTO.FirebaseLoginRequest;
import com.booking.book.Service.UserService;
import com.booking.book.entity.User;

import lombok.RequiredArgsConstructor;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> createOrUpdateFirebaseUser(@RequestBody FirebaseLoginRequest firebaseLoginRequest) {
        try{
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(firebaseLoginRequest.getFirebaseUid());
            String firebaseUid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            User updatedUser = userService.createOrUpdateFirebaseUser(firebaseUid, email);
            return ResponseEntity.ok(updatedUser);
        }catch(FirebaseAuthException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Firebase ID token");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsersList() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/updateRole")
    public ResponseEntity<?> updateRoleOfUser(@RequestHeader("Authorization") String authorizationHeader) {
        try{
            String idToken = authorizationHeader.startsWith("Bearer ") 
                         ? authorizationHeader.substring(7) 
                         : authorizationHeader;
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String firebaseUid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            User updatedUser = userService.updateRoleOfUser(firebaseUid, email);
            return ResponseEntity.ok(updatedUser);
        }catch(FirebaseAuthException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Firebase ID token");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }
}
