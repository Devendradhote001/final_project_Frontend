const Button = ({ children, icon, variant = "primary", handleClick }) => {
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-90",

    secondary:
      "bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)]",
  };

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-3 rounded-2xl flex items-center gap-2 font-medium transition-all duration-300 ${variants[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
