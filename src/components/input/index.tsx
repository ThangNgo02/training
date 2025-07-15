type InputProps = {
  name: string;
  typeInput: string;
  errorInput?: string;
  placeholder?: string;
  value: string;
  setValue: (val: string) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  typeInput,
  errorInput,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {name}
      </label>
      <input
        type={typeInput}
        name={name}
        id={name}
        placeholder={placeholder || name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
          ${errorInput ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'}`}
      />
      {errorInput && <p className="text-red-500 text-sm mt-1">{errorInput}</p>}
    </div>
  );
};

export default Input;
