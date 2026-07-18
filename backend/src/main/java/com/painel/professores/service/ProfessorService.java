package com.painel.professores.service;

import com.painel.professores.dto.CreateProfessorDTO;
import com.painel.professores.dto.ProfessorDTO;
import com.painel.professores.dto.UpdateProfessorDTO;
import com.painel.professores.model.Professor;
import com.painel.professores.repository.ProfessorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public List<ProfessorDTO> findAll() {
        return professorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProfessorDTO> findById(Long id) {
        return professorRepository.findById(id).map(this::convertToDTO);
    }

    public List<ProfessorDTO> findByUnidade(String unidade) {
        return professorRepository.findByUnidade(unidade).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProfessorDTO save(CreateProfessorDTO createProfessorDTO) {
        Professor professor = convertToEntity(createProfessorDTO);
        Professor savedProfessor = professorRepository.save(professor);
        return convertToDTO(savedProfessor);
    }

    public ProfessorDTO update(Long id, UpdateProfessorDTO updateProfessorDTO) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Professor not found with id: " + id));

        updateIfNotNull(updateProfessorDTO.getNome(), professor::setNome);
        updateIfNotNull(updateProfessorDTO.getInscricao(), professor::setInscricao);
        updateIfNotNull(updateProfessorDTO.getFoto(), professor::setFoto);
        updateIfNotNull(updateProfessorDTO.getUnidade(), professor::setUnidade);
        updateIfNotNull(updateProfessorDTO.getEntrada(), professor::setEntrada);
        updateIfNotNull(updateProfessorDTO.getSaida(), professor::setSaida);
        updateIfNotNull(updateProfessorDTO.getAlmocoInicio(), professor::setAlmocoInicio);
        updateIfNotNull(updateProfessorDTO.getAlmocoFim(), professor::setAlmocoFim);
        updateIfNotNull(updateProfessorDTO.getAtivo(), professor::setAtivo);

        Professor updatedProfessor = professorRepository.save(professor);
        return convertToDTO(updatedProfessor);
    }



    public void deleteById(Long id) {
        professorRepository.deleteById(id);
    }

    private ProfessorDTO convertToDTO(Professor professor) {
        ProfessorDTO dto = new ProfessorDTO();
        dto.setId(professor.getId());
        dto.setNome(professor.getNome());
        dto.setInscricao(professor.getInscricao());
        dto.setFoto(professor.getFoto());
        dto.setUnidade(professor.getUnidade());
        dto.setEntrada(professor.getEntrada());
        dto.setSaida(professor.getSaida());
        dto.setAlmocoInicio(professor.getAlmocoInicio());
        dto.setAlmocoFim(professor.getAlmocoFim());
        dto.setAtivo(professor.getAtivo());
        return dto;
    }

    private Professor convertToEntity(CreateProfessorDTO dto) {
        Professor professor = new Professor();
        professor.setNome(dto.getNome());
        professor.setInscricao(dto.getInscricao());
        professor.setFoto(dto.getFoto());
        professor.setUnidade(dto.getUnidade());
        professor.setEntrada(dto.getEntrada());
        professor.setSaida(dto.getSaida());
        professor.setAlmocoInicio(dto.getAlmocoInicio());
        professor.setAlmocoFim(dto.getAlmocoFim());
        professor.setAtivo(dto.getAtivo());
        return professor;
    }

    private <T> void updateIfNotNull(T value, java.util.function.Consumer<T> setter) {
        if (value != null) {
            setter.accept(value);
        }
    }
}
