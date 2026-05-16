import { useMemo, useState } from 'react';
import TeacherForm, { emptyTeacher } from './components/TeacherForm.jsx';
import TeacherList from './components/TeacherList.jsx';
import { mockTeachers } from './data/mockTeachers.js';

function generateNextCadastroId(teachers) {
  const maxId = teachers.reduce((max, teacher) => {
    return Math.max(max, Number(teacher.cadastroId) || 0);
  }, 0);

  return maxId + 1;
}

export default function App() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [formData, setFormData] = useState(emptyTeacher);
  const [editingId, setEditingId] = useState('');
  const [filter, setFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const hasSearchQuery = normalizedSearchQuery.length > 0;
  const isInscricaoSearch = /^\d{11}$/.test(normalizedSearchQuery);

  const filteredTeachers = useMemo(() => {
    let result = teachers;
    const normalizedQuery = normalizedSearchQuery;

    if (isInscricaoSearch) {
      return result.filter((teacher) => teacher.inscricao === normalizedQuery);
    }

    // Desligados só é válido quando há busca.
    if (!normalizedQuery && filter === 'desligados') {
      result = result.filter((t) => t.ativo !== 2);
      return result;
    }

    if (filter === 'desligados') {
      result = result.filter((t) => t.ativo === 2);
    } else {
      result = result.filter((t) => t.ativo !== 2);
      if (filter === 'ativos') result = result.filter((t) => t.ativo === 1);
      if (filter === 'inativos') result = result.filter((t) => t.ativo === 0);
    }

    if (!normalizedQuery) return result;

    return result.filter((teacher) =>
      teacher.unidade.toLowerCase().includes(normalizedQuery)
      || teacher.inscricao.toLowerCase().includes(normalizedQuery)
    );
  }, [teachers, filter, normalizedSearchQuery, isInscricaoSearch]);

  const emptyMessage = isInscricaoSearch
    ? 'Cadastro nao encontrado.'
    : 'Nenhum professor cadastrado com esse filtro.';

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function resetForm() {
    setFormData(emptyTeacher);
    setEditingId('');
  }

  function closeForm() {
    resetForm();
    setIsFormVisible(false);
  }

  function openCreateForm() {
    resetForm();
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.cadastroId === editingId ? { ...formData } : teacher
        )
      );
      closeForm();
      return;
    }

    const newTeacher = {
      ...formData,
      cadastroId: generateNextCadastroId(teachers)
    };

    setTeachers((prev) => [newTeacher, ...prev]);
    closeForm();
  }

  function handleEdit(teacher) {
    setEditingId(teacher.cadastroId);
    setFormData(teacher);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(cadastroId) {
    const confirmDelete = window.confirm('Deseja realmente excluir este professor?');
    if (!confirmDelete) return;
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.cadastroId === cadastroId ? { ...teacher, ativo: 2 } : teacher
      )
    );
    if (editingId === cadastroId) closeForm();
  }

  function handleToggleActive(cadastroId) {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.cadastroId === cadastroId
          ? { ...teacher, ativo: teacher.ativo === 1 ? 0 : 1 }
          : teacher
      )
    );
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="hero-kicker">Painel Administrativo</p>
        <h1>Cadastro de Professores</h1>
        <p>Gerencie cadastros, atualize dados, ative ou desative professores em um so lugar.</p>
      </header>

      <main className="layout">
        {isFormVisible && (
          <TeacherForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancelEdit={closeForm}
            isEditing={Boolean(editingId)}
          />
        )}

        <section className="panel filter-panel">
          <div className="section-title-row">
            <h2>Pesquisar cadastro</h2>
            {!isFormVisible && (
              <button className="btn-primary" type="button" onClick={openCreateForm}>
                Cadastrar professor
              </button>
            )}
          </div>
          <label className="search-label">
            Buscar por unidade ou inscricao
            <div className="search-row">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setSearchQuery(nextValue);
                  if (!nextValue.trim() && filter === 'desligados') {
                    setFilter('todos');
                  }
                }}
                placeholder="Ex.: 12 ou 20261001001"
              />
              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilter('todos');
                }}
                disabled={!searchQuery.trim() && filter === 'todos'}
              >
                Resetar
              </button>
            </div>
          </label>
          {!isInscricaoSearch && (
            <div className="filter-row">
              <button className={filter === 'todos' ? 'filter active' : 'filter'} onClick={() => setFilter('todos')} type="button">Todos</button>
              <button className={filter === 'ativos' ? 'filter active' : 'filter'} onClick={() => setFilter('ativos')} type="button">Ativos</button>
              <button className={filter === 'inativos' ? 'filter active' : 'filter'} onClick={() => setFilter('inativos')} type="button">Inativos</button>
              {hasSearchQuery && (
                <button className={filter === 'desligados' ? 'filter filter-desligados active' : 'filter filter-desligados'} onClick={() => setFilter('desligados')} type="button">Desligados</button>
              )}
            </div>
          )}
        </section>

        <TeacherList
          teachers={filteredTeachers}
          emptyMessage={emptyMessage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      </main>

      <footer className="app-footer">
        Criado em desenvolvido por Paulo Eduardo.
      </footer>
    </div>
  );
}
