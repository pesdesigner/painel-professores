package com.painel.professores.repository;

import com.painel.professores.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findByUnidade(String unidade);
    List<Professor> findByInscricao(String inscricao);
}
