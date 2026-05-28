const FormInput = ({
  label,
  placeholder,
  type = "text",
  register,
  name,
  errors,
}) => {
  return (
    <div>

      <label className="block mb-3 text-sm font-semibold text-[var(--text-secondary)]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: `${label} is required`,
        })}
        className="w-full h-16 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-main)] px-5 outline-none"
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-2">
          {errors[name].message}
        </p>
      )}

    </div>
  );
};

export default FormInput;