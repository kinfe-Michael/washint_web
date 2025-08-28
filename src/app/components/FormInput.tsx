import { ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}
const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, error }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-zinc-400 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full p-3 rounded-lg bg-zinc-800 text-zinc-200 border-2
        focus:outline-none transition-colors duration-200
        ${error ? 'border-red-500' : 'border-zinc-700 focus:border-white'}
      `}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormInput