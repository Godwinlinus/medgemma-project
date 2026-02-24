const CredentialCard = ({ title, value }) => (
  <div className="flex flex-col gap-1 border-t border-border-dark py-4">
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
    <p className="text-white text-sm font-medium">{value}</p>
  </div>
);

export default CredentialCard;
