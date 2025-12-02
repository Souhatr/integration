package com.mss.lieuRes.security;

import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class AuthUtil {

    @Autowired
    private UserRepo userRepo;

    public User getRequester(HttpServletRequest request) {
        if (request == null) return null;
        String username = request.getHeader("X-User");
        if (username == null || username.isEmpty()) return null;
        return userRepo.findByUsername(username);
    }

    public boolean isAdmin(User u) {
        if (u == null) return false;
        String r = u.getRole();
        return "ADMIN".equalsIgnoreCase(r) || "SUPER_ADMIN".equalsIgnoreCase(r);
    }

    public boolean isSuperAdmin(User u) {
        if (u == null) return false;
        return "SUPER_ADMIN".equalsIgnoreCase(u.getRole());
    }
}
