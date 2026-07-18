package com.painel.professores.controller;
import com.painel.professores.dto.CreateProfessorDTO;
import com.painel.professores.dto.ProfessorDTO;
import com.painel.professores.dto.UpdateProfessorDTO;
import com.painel.professores.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/professores")
public class ProfessorController {
    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> findAll() {
        List<ProfessorDTO> professores = professorService.findAll();
        return ResponseEntity.ok(professores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> findById(@PathVariable Long id) {
        return professorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProfessorDTO>> findProfessors(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "todos") String filter) {
        List<ProfessorDTO> professors = professorService.findProfessors(search, filter);
        if (professors.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(professors);
    }

    @GetMapping("/unidade/{unidade}")
    public ResponseEntity<List<ProfessorDTO>> findByUnidade(@PathVariable String unidade) {
        List<ProfessorDTO> professores = professorService.findByUnidade(unidade);
        return ResponseEntity.ok(professores);
    }
    @PostMapping
    public ResponseEntity<ProfessorDTO> save(@RequestBody CreateProfessorDTO createProfessorDTO) {
        ProfessorDTO savedProfessor = professorService.save(createProfessorDTO);
        return ResponseEntity.ok(savedProfessor);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> update(@PathVariable Long id, @RequestBody UpdateProfessorDTO updateProfessorDTO) {
        ProfessorDTO updatedProfessor = professorService.update(id, updateProfessorDTO);
        return ResponseEntity.ok(updatedProfessor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        professorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
