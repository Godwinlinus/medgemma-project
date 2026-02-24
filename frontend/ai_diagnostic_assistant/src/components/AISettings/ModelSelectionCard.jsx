import {
  MdAddCircleOutline,
  MdMoreVert,
  MdClose
} from "react-icons/md";

const STATUS_STYLES = {
  active: {
    text: "text-emerald-500",
    dot: "bg-emerald-500"
  },
  downloading: {
    text: "text-primary",
    dot: "bg-primary animate-pulse"
  },
  inactive: {
    text: "text-slate-500",
    dot: "bg-slate-500"
  }
};

const resolveStatusStyle = (status = "") => {
  if (status.toLowerCase().includes("active")) return STATUS_STYLES.active;
  if (status.toLowerCase().includes("downloading"))
    return STATUS_STYLES.downloading;
  return STATUS_STYLES.inactive;
};

const ModelSelectionCard = ({ models = [] }) => {
  return (
    <section className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
      <header className="px-6 py-4 border-b border-border-dark flex justify-between items-center">
        <h3 className="text-sm font-bold tracking-wide">
          Preferred Diagnostic Models
        </h3>

        <button
          type="button"
          className="text-sm font-bold flex items-center gap-1 text-primary hover:opacity-90"
          aria-label="Browse model library"
        >
          <MdAddCircleOutline size={18} />
          Browse Model Library
        </button>
      </header>

      {models.length === 0 ? (
        <div className="px-6 py-10 text-sm text-slate-500 text-center">
          No diagnostic models configured yet. Bold move.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-3 font-medium">Model Name</th>
                <th className="px-6 py-3 font-medium">Version</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-dark">
              {models.map((model) => {
                const statusStyle = resolveStatusStyle(model.status);

                return (
                  <tr
                    key={model.id ?? `${model.name}-${model.version}`}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold">{model.name}</span>
                        <span className="text-xs text-slate-500">
                          {model.type}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono text-xs">
                      {model.version}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`flex items-center gap-2 font-medium ${statusStyle.text}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
                        />
                        {model.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label={
                          model.status
                            ?.toLowerCase()
                            .includes("downloading")
                            ? "Cancel download"
                            : "Open model actions"
                        }
                      >
                        {model.status
                          ?.toLowerCase()
                          .includes("downloading") ? (
                          <MdClose size={18} />
                        ) : (
                          <MdMoreVert size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ModelSelectionCard;
