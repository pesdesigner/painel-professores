const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function normalizeProfessor(professor) {
  return {
    ...professor,
    id: professor.id ?? professor.cadastroId,
    ativo: professor.ativo ?? 1
  };
}

export async function fetchProfessores() {
  const response = await fetch(`${API_BASE_URL}/professores`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os professores da API.');
  }

  const data = await response.json();
  return data.map(normalizeProfessor);
}

export async function createProfessor(professor) {
  const payload = {
    nome: professor.nome,
    inscricao: professor.inscricao,
    foto: professor.foto ?? '',
    unidade: professor.unidade,
    entrada: professor.entrada,
    saida: professor.saida,
    almocoInicio: professor.almocoInicio,
    almocoFim: professor.almocoFim,
    ativo: Number(professor.ativo ?? 1)
  };

  const response = await fetch(`${API_BASE_URL}/professores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Não foi possível criar o professor.');
  }

  const data = await response.json();
  return normalizeProfessor(data);
}

export async function updateProfessor(id, professor) {
  const payload = {
    nome: professor.nome,
    inscricao: professor.inscricao,
    foto: professor.foto ?? '',
    unidade: professor.unidade,
    entrada: professor.entrada,
    saida: professor.saida,
    almocoInicio: professor.almocoInicio,
    almocoFim: professor.almocoFim,
    ativo: Number(professor.ativo ?? 1)
  };

  const response = await fetch(`${API_BASE_URL}/professores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Não foi possível atualizar o professor.');
  }

  const data = await response.json();
  return normalizeProfessor(data);
}

export async function deleteProfessor(id) {
  const response = await fetch(`${API_BASE_URL}/professores/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Não foi possível excluir o professor.');
  }
}
