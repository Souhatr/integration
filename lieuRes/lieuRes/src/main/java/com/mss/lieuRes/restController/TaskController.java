package com.mss.lieuRes.restController;

import com.mss.lieuRes.entities.Task;
import com.mss.lieuRes.entities.User;
import com.mss.lieuRes.repo.TaskRepository;
import com.mss.lieuRes.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private AuthUtil authUtil;

    // Admin creates/assigns tasks
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task t, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        Task saved = taskRepository.save(t);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks(HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        return ResponseEntity.ok(taskRepository.findAll());
    }

    // Employee: get assigned tasks
    @GetMapping("/mine")
    public ResponseEntity<?> myTasks(HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");
        List<Task> tasks = taskRepository.findByAssignedTo(req.getIdU());
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable int id, @RequestBody Task t, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null) return ResponseEntity.status(401).body("Unauthenticated");
        Optional<Task> opt = taskRepository.findById(id);
        if (!opt.isPresent()) return ResponseEntity.notFound().build();
        Task existing = opt.get();
        // allow admin to modify any field
        if (authUtil.isAdmin(req)) {
            existing.setTitle(t.getTitle());
            existing.setDescription(t.getDescription());
            existing.setAssignedTo(t.getAssignedTo());
            existing.setStatus(t.getStatus());
            taskRepository.save(existing);
            return ResponseEntity.ok(existing);
        }
        // allow assigned user to update status only
        if (existing.getAssignedTo() == req.getIdU()) {
            existing.setStatus(t.getStatus());
            taskRepository.save(existing);
            return ResponseEntity.ok(existing);
        }
        return ResponseEntity.status(403).body("Access denied");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id, HttpServletRequest request) {
        User req = authUtil.getRequester(request);
        if (req == null || !authUtil.isAdmin(req)) return ResponseEntity.status(403).body("Access denied");
        taskRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
