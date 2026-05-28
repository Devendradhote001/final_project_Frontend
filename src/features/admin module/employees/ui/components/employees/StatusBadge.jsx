const StatusBadge = ({ status }) => {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
        ${
          status === "active"
            ? "bg-blue-100 text-blue-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-current" />
  
        {status === "active"
          ? "Active"
          : "On Leave"}
      </div>
    );
  };
  
  export default StatusBadge;