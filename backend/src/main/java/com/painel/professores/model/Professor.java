package com.painel.professores.model;
import jakarta.persistence.*;
@Entity
@Table(name = "PROFESSOR")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Chave primária

    private String nome;
    private String inscricao;
    private String foto;
    private String unidade;
    private String entrada;
    private String saida;
    private String almocoInicio;
    private String almocoFim;
    private Integer ativo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getInscricao() {
        return inscricao;
    }

    public void setInscricao(String inscricao) {
        this.inscricao = inscricao;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getEntrada() {
        return entrada;
    }

    public void setEntrada(String entrada) {
        this.entrada = entrada;
    }

    public String getSaida() {
        return saida;
    }

    public void setSaida(String saida) {
        this.saida = saida;
    }

    public String getAlmocoInicio() {
        return almocoInicio;
    }

    public void setAlmocoInicio(String almocoInicio) {
        this.almocoInicio = almocoInicio;
    }

    public String getAlmocoFim() {
        return almocoFim;
    }

    public void setAlmocoFim(String almocoFim) {
        this.almocoFim = almocoFim;
    }

    public Integer getAtivo() {
        return ativo;
    }

    public void setAtivo(Integer ativo) {
        this.ativo = ativo;
    }
}

