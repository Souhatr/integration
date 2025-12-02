package com.mss.lieuRes.config;

import com.mss.lieuRes.entities.Role;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepo userRepo;

    @Override
    public void run(String... args) throws Exception {
        try {
            User superAdmin = userRepo.findByUsername("superadmin");
            if (superAdmin == null) {
                User u = new User();
                u.setNom("Super");
                u.setPrenom("Admin");
                u.setEmail("superadmin@example.com");
                u.setUsername("superadmin");
                u.setMotdepasse("admin");
                u.setRole(Role.SUPER_ADMIN);
                userRepo.save(u);
                System.out.println("Created default superadmin (username: superadmin, password: admin)");
            }
        } catch (Exception e) {
            System.err.println("Error initializing data: " + e.getMessage());
        }
    }
}
