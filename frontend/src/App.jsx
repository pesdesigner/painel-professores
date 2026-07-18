import { useEffect, useMemo, useState } from 'react';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import TeacherForm, { emptyTeacher } from './components/TeacherForm.jsx';
import TeacherList from './components/TeacherList.jsx';
import Toast from './components/Toast.jsx';
import { createProfessor, deleteProfessor, fetchProfessores, updateProfessor } from './services/professoresApi.js';

export default function App() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyTeacher);
  const [editingId, setEditingId] = useState('');
  const [filter, setFilter] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
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

  useEffect(() => {
    let isMounted = true;

    async function loadTeachers() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProfessores();
        if (isMounted) {
          setTeachers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar professores.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

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

  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  function closeForm({ showCancelToast = false } = {}) {
    resetForm();
    setIsFormVisible(false);
    if (showCancelToast) {
      showToast('Operação cancelada.', 'success');
    }
  }

  function openCreateForm() {
    resetForm();
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError('');

      if (editingId) {
        const updatedTeacher = await updateProfessor(editingId, formData);
        setTeachers((prev) =>
          prev.map((teacher) =>
            teacher.id === editingId ? updatedTeacher : teacher
          )
        );
        showToast('Professor atualizado com sucesso!', 'success');
        closeForm();
        return;
      }

      const createdTeacher = await createProfessor(formData);
      setTeachers((prev) => [createdTeacher, ...prev]);
      showToast('Professor criado com sucesso!', 'success');
      closeForm();
    } catch (err) {
      const message = err.message || 'Erro ao salvar professor.';
      setError(message);
      showToast(message, 'error');
    }
  }

  function handleEdit(teacher) {
    setEditingId(teacher.id);
    setFormData(teacher);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function requestDelete(cadastroId) {
    setConfirmDelete(cadastroId);
  }

  async function handleDelete(cadastroId) {
    try {
      setError('');
      await deleteProfessor(cadastroId);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== cadastroId));
      showToast('Professor excluído com sucesso!', 'success');
      if (editingId === cadastroId) closeForm();
    } catch (err) {
      const message = err.message || 'Erro ao excluir professor.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setConfirmDelete(null);
    }
  }


  return (
    <div className="app-shell">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirmDelete !== null && (
        <ConfirmDialog
          title="Excluir professor"
          message="Tem certeza que deseja excluir este professor?"
          onCancel={() => {
            setConfirmDelete(null);
            showToast('Exclusão cancelada.', 'success');
          }}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
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
            onCancelEdit={() => closeForm({ showCancelToast: true })}
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

        {loading ? (
          <section className="panel list-panel">
            <h2>Professores</h2>
            <p className="muted">Carregando professores...</p>
          </section>
        ) : error ? (
          <section className="panel list-panel">
            <h2>Professores</h2>
            <p className="muted">{error}</p>
          </section>
        ) : (
          <TeacherList
            teachers={filteredTeachers}
            emptyMessage={emptyMessage}
            onEdit={handleEdit}
            onDelete={requestDelete}
          />
        )}
      </main>

      <footer className="app-footer">
        Criado em desenvolvido por Paulo Eduardo.
      </footer>
    </div>
  );
}
