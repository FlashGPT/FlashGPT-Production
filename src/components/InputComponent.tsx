import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function InputComponent({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <h1>{label}</h1>
      <input
        className="border border-gray rounded-md px-5 py-3 shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputComponent;
