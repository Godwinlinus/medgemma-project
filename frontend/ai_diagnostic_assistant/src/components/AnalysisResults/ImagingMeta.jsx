const ImagingMeta = ({ type }) => (
  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
    <span className="material-icons-round text-slate-300">view_in_ar</span>
    <div>
      <p className="text-xs text-slate-400 font-medium">Imaging Type</p>
      <p className="text-sm font-semibold text-white">{type}</p>
    </div>
  </div>
);

export default ImagingMeta;
