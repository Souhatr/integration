package com.mss.lieuRes.restController;

import com.mss.lieuRes.entities.Signal;
import com.mss.lieuRes.entities.SignalCategory;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.SignalCategoryRepository;
import com.mss.lieuRes.repo.SignalRepository;
import com.mss.lieuRes.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/signals")
public class SignalController {

    @Autowired
    private SignalRepository signalRepository;

    @Autowired
    private SignalCategoryRepository categoryRepository;

    @Autowired
    private AuthUtil authUtil;

    // --- categories (admin) ---
    @GetMapping("/categories")
    public List<SignalCategory> getCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody SignalCategory c, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        SignalCategory saved = categoryRepository.save(c);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- signals ---
    @PostMapping
    public ResponseEntity<?> createSignal(@RequestBody Signal s, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");
        s.setIdU(req.getIdU());
        s.setDateReported(new Date());
        s.setStatus("NEW");
        // if frontend provided a category object with idC, attach a managed entity
        if (s.getCategory() != null && s.getCategory().getIdC() > 0) {
            Optional<SignalCategory> catOpt = categoryRepository.findById(s.getCategory().getIdC());
            catOpt.ifPresent(s::setCategory);
        } else {
            s.setCategory(null);
        }
        // normalize idL if 0
        if (s.getIdL() != null && s.getIdL() == 0) s.setIdL(null);

        try {
            Signal saved = signalRepository.save(s);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            // log server-side for debugging
            e.printStackTrace();
            String msg = e.getMessage();
            return ResponseEntity.status(500).body(java.util.Map.of("error", "failed to save signal", "detail", msg));
        }
    }

    @GetMapping
    public List<Signal> getAllSignals(HttpServletRequest request) {
        // admin only
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return List.of();
        return signalRepository.findAll();
    }

    @GetMapping("/user/{idU}")
    public List<Signal> getSignalsByUser(@PathVariable int idU, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return List.of();
        // allow users to fetch their own signals or admins
        if (req.getIdU() == idU || authUtil.isAdmin(req)) {
            return signalRepository.findByIdU(idU);
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSignal(@PathVariable int id, HttpServletRequest request) {
        Optional<Signal> s = signalRepository.findById(id);
        if (!s.isPresent()) return ResponseEntity.notFound().build();
        Signal sig = s.get();
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");
        if (req.getIdU() == sig.getIdU() || authUtil.isAdmin(req)) return ResponseEntity.ok(sig);
        return ResponseEntity.status(403).body("Access denied");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSignal(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        signalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable int id, @RequestBody String status, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        Optional<Signal> opt = signalRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        Signal s = opt.get();
        s.setStatus(status);
        signalRepository.save(s);
        return ResponseEntity.ok(s);
    }
}
