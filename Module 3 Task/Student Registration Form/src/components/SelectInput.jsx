import React from "react";

function SelectInput({ label, myForm, id, options }) {
  return (
    <>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        value={myForm.values.course}
        onChange={myForm.handleChange}
      >
        {options.map(({ value, optionlabel }) => (
          <option value={value}>{optionlabel}</option>
        ))}
      </select>
      <p id="error" className="text-red-500 text-sm">
        {myForm.touched.course && myForm.errors.course}
      </p>
    </>
  );
}

export default SelectInput;
