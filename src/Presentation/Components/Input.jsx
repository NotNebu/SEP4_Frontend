// src/components/Input.jsx  (eller hvor din fil nu ligger)
import React from "react";

/**
 * Genanvendelig input-komponent med label.
 *
 * @component
 */
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 
          border rounded-lg 
          bg-gray-800 text-white border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          transition
        `}
      />
    </div>
  );
}
