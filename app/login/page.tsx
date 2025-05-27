"use client";

import React, { useState } from "react";
import { PageLayout } from "@components/PageLayout/PageLayout";
import { useRouter } from "next/navigation";
import BookMeLogo from "@assets/icons/bookme.svg";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const Bookings = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
  };

  return (
    <PageLayout
      title={{
        text: "",
      }}
      previousBtn={{ hidden: true }}
    >
      <BookMeLogo />
      <label
        htmlFor="email"
        className="w-full text-left mb-1 text-lg font-medium text-dark-gray"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        className={`border ${errors.email ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
        placeholder="Enter your email"
      />

      <label
        htmlFor="password"
        className="w-full text-left mb-1 text-lg font-medium text-dark-gray"
      >
        Password
      </label>
      <div className="relative w-full">
        <button
          className="text-dark-gray absolute right-3 inset-y-0 my-auto "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className={`border ${errors.password ? "border-red-500 text-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`${isSubmitting ? "bg-light-blue " : "bg-electric-blue"} text-white rounded-md py-2 px-6 mt-4 ${!isSubmitting && "hover:bg-light-blue"} `}
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin w-4 h-4" />
        ) : (
          "Sign-in"
        )}
      </button>
    </PageLayout>
  );
};

export default Bookings;
