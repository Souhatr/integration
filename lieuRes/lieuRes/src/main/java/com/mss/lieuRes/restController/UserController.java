package com.mss.lieuRes.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mss.lieuRes.service.UserService;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.entities.Reservation;
import com.mss.lieuRes.entities.Role;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.mss.lieuRes.security.AuthUtil;
import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService  userService;
    @Autowired
    private AuthUtil authUtil;
    
    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        Page<User> users = userService.getAllUsers(page, size);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");
        return ResponseEntity.ok(req);
    }
    
    @PostMapping("/inscrire")
    public ResponseEntity<Boolean> inscrire(@RequestBody User user) {
        boolean result = userService.inscrire(user);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
        User user = userService.login(
                credentials.get("nomUser"), 
                credentials.get("motdepasse"));
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }
    
    @PostMapping("/logout/{idU}")
    public ResponseEntity<Void> logout(@PathVariable Integer idU) {
        userService.logout(idU);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{idU}/reservations")
    public ResponseEntity<Boolean> saveRes(@PathVariable Integer idU, @RequestBody Reservation res) {
        boolean result = userService.saveRes(idU, res);
        return ResponseEntity.ok(result);
    }
    
    @PutMapping("/{idU}/reservations/{idR}")
    public ResponseEntity<Boolean> updateRes(@PathVariable Integer idU, 
                                             @PathVariable Integer idR, 
                                             @RequestBody Reservation res) {
        boolean result = userService.updateRes(idU, res, idR);
        return ResponseEntity.ok(result);
    }
    
    @DeleteMapping("/{idU}/reservations/{idR}")
    public ResponseEntity<Boolean> suppRes(@PathVariable Integer idU, @PathVariable Integer idR) {
        boolean result = userService.suppRes(idU, idR);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{idU}/reservations")
    public ResponseEntity<List<Reservation>> getAllRes(@PathVariable Integer idU) {
        List<Reservation> reservations = userService.getAllRes(idU);
        return ResponseEntity.ok(reservations);
    }
    
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        // only SUPER_ADMIN can create ADMIN users
        if ((user.getRole() == Role.ADMIN) && !authUtil.isSuperAdmin(req)) {
            return ResponseEntity.status(403).body("Only SUPER_ADMIN can create ADMIN users");
        }
        User created = userService.createUser(user);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User user, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");

        User existing = userService.getUserById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        // if requester is admin, allow update but only SUPER_ADMIN can assign ADMIN role
        if (authUtil.isAdmin(req)) {
        	if ((user.getRole() == Role.ADMIN) && !authUtil.isSuperAdmin(req)) {
                return ResponseEntity.status(403).body("Only SUPER_ADMIN can assign ADMIN role");
            }
            User updated = userService.updateUser(id, user);
            return ResponseEntity.ok(updated);
        }

        // otherwise requester must be the owner and cannot change their role
        if (req.getIdU() == id) {
            user.setRole(existing.getRole()); // prevent role escalation
            User updated = userService.updateUser(id, user);
            return ResponseEntity.ok(updated);
        }

        return ResponseEntity.status(403).body("Access denied");
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}