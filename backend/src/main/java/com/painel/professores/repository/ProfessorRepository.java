package com.painel.professores.repository;

import com.painel.professores.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findByUnidade(String unidade);
    @Query("SELECT p FROM Professor p WHERE " +
            "(:search IS NULL OR (LENGTH(:search) = 11 AND p.inscricao = :search) OR " +
            "(LENGTH(:search) != 11 AND (p.unidade LIKE CONCAT('%', :search, '%') OR p.inscricao LIKE CONCAT('%', :search, '%')))) AND " +
            "(:filter = 'todos' AND p.ativo != 2 OR " +
            ":filter = 'ativos' AND p.ativo = 1 OR " +
            ":filter = 'inativos' AND p.ativo = 0 OR " +
            ":filter = 'desligados' AND p.ativo = 2)")
    List<Professor> findBySearchAndFilter(@Param("search") String search, @Param("filter") String filter);
}
