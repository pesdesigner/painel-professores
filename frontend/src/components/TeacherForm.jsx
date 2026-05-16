const emptyTeacher = {
  cadastroId: '',
  nome: '',
  inscricao: '',
  foto: '',
  unidade: '',
  entrada: '',
  saida: '',
  almocoInicio: '',
  almocoFim: '',
  ativo: 1
};

export default function TeacherForm({ formData, onChange, onSubmit, onCancelEdit, isEditing }) {
  const previewPhoto = formData.foto || '/default-teacher.svg';

  return (
    <section className="panel form-panel">
      <div className="section-title-row">
        <h2>{isEditing ? 'Atualizar professor' : 'Novo professor'}</h2>
        <button className="btn-secondary" onClick={onCancelEdit} type="button">
          {isEditing ? 'Cancelar edicao' : 'Fechar formulario'}
        </button>
      </div>

      <form onSubmit={onSubmit} className="teacher-form">
        {isEditing && (
          <label>
            ID de cadastro
            <input name="cadastroId" value={formData.cadastroId} readOnly disabled />
          </label>
        )}

        <label>
          Nome
          <input name="nome" value={formData.nome} onChange={onChange} required />
        </label>

        <label>
          Numero de inscricao
          <input
            name="inscricao"
            value={formData.inscricao}
            onChange={onChange}
            placeholder="00000000000"
            maxLength={11}
            pattern="\d{11}"
            inputMode="numeric"
            title="Informe exatamente 11 digitos numericos"
            required
          />
        </label>

        <div className="photo-url-row">
          <label>
            URL da foto
            <input name="foto" value={formData.foto} onChange={onChange} placeholder="https://..." />
            <span className="input-hint">foto opcional</span>
          </label>

          <div className="photo-preview" aria-label="Preview da foto do professor">
            <img src={previewPhoto} alt="Preview da foto" />
          </div>
        </div>

        <label>
          Numero da unidade
          <input name="unidade" value={formData.unidade} onChange={onChange} required />
        </label>

        <div className="time-row">
          <label>
            Horario de entrada
            <input type="time" name="entrada" value={formData.entrada} onChange={onChange} required />
          </label>

          <label>
            Horario de saida
            <input type="time" name="saida" value={formData.saida} onChange={onChange} required />
          </label>
        </div>

        <div className="time-row">
          <label>
            Almoco inicio
            <input type="time" name="almocoInicio" value={formData.almocoInicio} onChange={onChange} required />
          </label>

          <label>
            Almoco fim
            <input type="time" name="almocoFim" value={formData.almocoFim} onChange={onChange} required />
          </label>
        </div>

        <label className="inline-toggle">
          <input
            type="checkbox"
            name="ativo"
            checked={formData.ativo === 1}
            onChange={(event) =>
              onChange({ target: { name: 'ativo', value: event.target.checked ? 1 : 0, type: 'number' } })
            }
          />
          Ativo para lecionar
        </label>

        <button className="btn-primary" type="submit">
          {isEditing ? 'Salvar atualizacao' : 'Cadastrar professor'}
        </button>
      </form>
    </section>
  );
}

export { emptyTeacher };
