import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export type TextInputProps = {
  error?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, label, type, placeholder, readonly, value, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <div className="">
        <label
          htmlFor={label.toLowerCase()}
          className="w-full text-left mb-1 text-sm font-medium text-dark-gray"
        >
          {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
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
            id={label.toLowerCase()}
            type={type ?? "text"}
            className={`border ${!!error ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
            placeholder={placeholder}
            readOnly={readonly}
            value={value}
            {...rest}
          />
          <p className="text-red-500 text-sm min-h-[1.5rem]">{error ?? ""}</p>
        </div>
      </div>
    );
  },
);
