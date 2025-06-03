import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type TextInputProps = {
  error?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
};

export const TextInput = (props: TextInputProps) => {
  const { error, value, name, onChange, type, placeholder } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <label
        htmlFor={name.toLowerCase()}
        className="w-full text-left mb-1 text-sm font-medium text-dark-gray"
      >
        {name}
      </label>
      <div className="relative w-full">
        {type === "password" && (
          <button
            className="text-dark-gray absolute right-3 inset-y-0 my-auto "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
        <input
          id={name.toLowerCase()}
          type={type ?? "text"}
          value={value}
          onChange={onChange}
          className={`border ${!!error ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
          placeholder={placeholder}
        />
        <p className="text-red-500">{error}</p>
      </div>
    </>
  );
};
