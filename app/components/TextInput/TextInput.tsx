import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type TextInputProps = {
  error?: string;
  name: string;
  type?: string;
  placeholder?: string;
} & React.HTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, name, type, placeholder, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <>
        <label
          htmlFor={name.toLowerCase()}
          className="w-full text-left mb-1 text-sm font-medium text-dark-gray"
        >
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </label>
        <div className="relative w-full">
          {type === "password" && (
            <button
              className="text-dark-gray absolute right-3 inset-y-0 my-auto "
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          )}
          <input
            ref={ref}
            name={name}
            id={name.toLowerCase()}
            type={type ?? "text"}
            className={`border ${!!error ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
            placeholder={placeholder}
            {...rest}
          />
          <p className="text-red-500 min-h-[1.5rem]">{error ?? ""}</p>
        </div>
      </>
    );
  },
);
