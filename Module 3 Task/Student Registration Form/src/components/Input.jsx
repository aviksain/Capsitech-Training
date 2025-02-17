import React from "react";

function Input({
  label,
  id,
  placeholder,
  type,
  className,
  FieldValue,
  handleChange,
  error
}) {
  return (
    <>
      <label for={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        onChange={handleChange}
        value={FieldValue}
        className={`${className} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        placeholder={placeholder}
        required
      />
      <p id="error" className="text-red-500 text-sm">{error}</p>
    </>
  );
}

export default Input;
