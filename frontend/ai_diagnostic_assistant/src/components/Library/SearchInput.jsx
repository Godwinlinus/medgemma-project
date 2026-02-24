import { MdOutlineYoutubeSearchedFor, MdClose } from "react-icons/md";

const SearchInput = ({
  placeholder = "Search drugs, guidelines, or literature…",
  value,
  onChange,
  onClear,
  className = "",
}) => {
  return (
    <div
      className={`relative flex-1 max-w-2xl group ${className}`}
    >
      {/* Search icon */}
      <MdOutlineYoutubeSearchedFor
        className="absolute left-4 top-1/2 -translate-y-1/2
                   text-slate-400 text-lg
                   group-focus-within:text-primary
                   transition-colors"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full bg-surface-dark
          border border-border-dark
          rounded-full
          py-2 pl-12 pr-10
          text-sm
          outline-none
          transition-all
          focus:border-primary
          focus:ring-2 focus:ring-primary/20
          placeholder:text-slate-500
        "
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-white
            transition-colors
          "
        >
          <MdClose className="text-sm" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
