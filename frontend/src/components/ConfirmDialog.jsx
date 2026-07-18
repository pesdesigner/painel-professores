export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-backdrop" role="dialog" aria-modal="true">
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-danger" type="button" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
