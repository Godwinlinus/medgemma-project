const EditableCredentialCard = ({ title, value, onChange }) => (
  <div className="flex flex-col gap-1 border-t border-border-dark py-4">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-surface-dark text-white text-sm font-medium rounded px-2 py-1 border border-border-dark focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

export default EditableCredentialCard;
