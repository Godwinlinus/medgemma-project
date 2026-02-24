const ImageToolButton = ({ icon }) => (
  <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded border border-border-light dark:border-border-dark transition-all">
    <span className="material-icons-round text-lg">{icon}</span>
  </button>
);

export default ImageToolButton;
