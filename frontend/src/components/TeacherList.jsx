export default function TeacherList({ teachers, emptyMessage, onEdit, onDelete }) {
  const fallbackPhoto = '/default-teacher.svg';

  if (teachers.length === 0) {
    return (
      <section className="panel list-panel">
        <h2>Professores</h2>
        <p className="muted">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="panel list-panel">
      <h2>Professores ({teachers.length})</h2>
      <div className="teacher-grid">
        {teachers.map((teacher) => (
          <article className="teacher-card" key={teacher.id}>
            <img
              src={teacher.foto || fallbackPhoto}
              alt={`Foto de ${teacher.nome}`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackPhoto;
              }}
            />
            <div className="teacher-main">
              <h3>{teacher.nome}</h3>
              <p><strong>ID:</strong> {teacher.id}</p>
              <p><strong>Inscricao:</strong> {teacher.inscricao}</p>
              <p><strong>Unidade:</strong> {teacher.unidade}</p>
              <p><strong>Entrada/Saida:</strong> {teacher.entrada} - {teacher.saida}</p>
              <p><strong>Almoco:</strong> {teacher.almocoInicio} - {teacher.almocoFim}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={teacher.ativo === 1 ? 'status-on' : 'status-off'}>
                  {teacher.ativo === 1 ? 'Ativo' : 'Inativo'}
                </span>
              </p>
            </div>

            <div className="teacher-actions">
              <button className="btn-secondary" onClick={() => onEdit(teacher)} type="button">Editar</button>
              <button className="btn-danger" onClick={() => onDelete(teacher.id)} type="button">Excluir</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
