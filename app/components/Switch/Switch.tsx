import React, { useState } from "react";
import { SwitchProps } from "./Switch.types";

const Switch = (props: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { label, description } = props;
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const switchComponentDesc = `switch-component-desc-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="inline-flex gap-2">
      <div className="relative inline-block w-11 h-5">
        <input
          id={switchComponentDesc}
          type="checkbox"
          className="peer appearance-none w-11 h-5 bg-slate-200 rounded-full checked:bg-green-400 cursor-pointer transition-colors duration-300"
        />
        <label
          htmlFor={switchComponentDesc}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 cursor-pointer"
        ></label>
      </div>

      <label
        htmlFor={switchComponentDesc}
        className="text-slate-600 text-sm cursor-pointer"
      >
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-slate-500">{description}</p>
        </div>
      </label>
    </div>
  );
};

export default Switch;
