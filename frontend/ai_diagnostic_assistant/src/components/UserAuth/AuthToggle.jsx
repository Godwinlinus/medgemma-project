const AuthToggle = ({ mode, setMode }) => (
  <div className="flex h-12 w-full items-center justify-center rounded-xl p-1.5">
    {["signin", "signup"].map((item) => (
      <label
        key={item}
        className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold leading-normal transition-all ${
          mode === item ? "bg-surface-dark text-primary-light" : "text-[#9bbbb9]"
        }`}
      >
        <span className="truncate">{item === "signin" ? "Sign In" : "Sign Up"}</span>
        <input
          className="hidden"
          type="radio"
          name="auth-mode"
          value={item}
          checked={mode === item}
          onChange={() => setMode(item)}
        />
      </label>
    ))}
  </div>
);

export default AuthToggle;
