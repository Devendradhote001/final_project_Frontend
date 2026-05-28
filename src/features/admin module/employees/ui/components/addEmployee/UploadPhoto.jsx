import { Camera, Pencil } from "lucide-react";

const UploadPhoto = () => {
  return (
    <div>

      <div className="relative w-[170px] h-[170px] rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-main)] flex flex-col items-center justify-center">

        <Camera
          size={42}
          className="text-[var(--text-muted)]"
        />

        <p className="mt-4 text-[var(--text-secondary)] font-medium">
          Upload Photo
        </p>

        <button
          className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center"
        >
          <Pencil size={18} />
        </button>

      </div>

      <p className="mt-5 text-sm font-medium text-[var(--text-secondary)]">
        JPG or PNG. Max size of 800K.
      </p>

    </div>
  );
};

export default UploadPhoto;