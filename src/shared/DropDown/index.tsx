import { ChangeEvent } from "react";

interface CustomDropdownProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const CustomDropdown = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
}: CustomDropdownProps) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-md bg-white shadow-sm transition duration-200 ease-in-out cursor-pointer">
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
