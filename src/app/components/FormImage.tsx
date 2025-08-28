import { ImageIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";


interface FormImageUploadProps {
  id: string;
  label: string;
  file: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormImageUpload: React.FC<FormImageUploadProps> = ({ id, label, file, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [file]);

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className={`relative w-36 h-36 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${error ? 'border-red-500' : 'border-zinc-700 focus-within:border-white'}`}>
        <label htmlFor={id} className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2 text-zinc-400 hover:text-white transition-colors">
          {preview ? (
            <img src={preview} alt="Album Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <ImageIcon className="w-8 h-8" />
              <span className="mt-2 text-center text-sm">Upload Cover</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default FormImageUpload