package com.mss.lieuRes.restController;

import com.mss.lieuRes.entities.SignalCategory;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.SignalCategoryRepository;
import com.mss.lieuRes.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/signal-categories")
public class SignalCategoryController {

    @Autowired
    private SignalCategoryRepository categoryRepository;

    @Autowired
    private AuthUtil authUtil;

    @GetMapping
    public List<SignalCategory> list() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SignalCategory c, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        return ResponseEntity.ok(categoryRepository.save(c));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
