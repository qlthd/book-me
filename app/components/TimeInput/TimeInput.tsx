import React, { useState } from "react";

const TimeInput = ({ value, onChange }) => {
  const [time, setTime] = useState(value || "");

  const handleChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");

    // Insert ":" automatically
    if (val.length >= 3) {
      val = val.slice(0, 2) + ":" + val.slice(2, 4);
    }

    // Limit to 5 characters
    if (val.length > 5) {
      val = val.slice(0, 5);
    }

    setTime(val);

    // Validate final format if complete
    if (val.length === 5) {
      const [hh, mm] = val.split(":").map(Number);
      if (hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59) {
        onChange && onChange(val); // valid time
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="HH:MM"
      value={time}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
};

export default TimeInput;
