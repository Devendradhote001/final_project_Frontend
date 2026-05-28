const RadioStatus = () => {
    return (
      <div>
  
        <label className="block mb-4 text-sm font-semibold text-[var(--text-secondary)]">
          Employment Status
        </label>
  
        <div className="flex items-center gap-8">
  
          <label className="flex items-center gap-3 cursor-pointer">
  
            <input
              type="radio"
              name="status"
              defaultChecked
              className="w-5 h-5 accent-[var(--primary)]"
            />
  
            <span className="text-lg text-[var(--text-primary)]">
              Active
            </span>
  
          </label>
  
          <label className="flex items-center gap-3 cursor-pointer">
  
            <input
              type="radio"
              name="status"
              className="w-5 h-5 accent-[var(--primary)]"
            />
  
            <span className="text-lg text-[var(--text-primary)]">
              Inactive
            </span>
  
          </label>
  
        </div>
  
      </div>
    );
  };
  
  export default RadioStatus;