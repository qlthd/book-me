"use client";

import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "@components/Modal/Modal";
import { ModalConfirmBookingProps } from "@components/ModalConfirmBooking/ModalConfirmBooking.types";
import { TextInput } from "@components/TextInput/TextInput";

const ModalConfirmBooking = (props: ModalConfirmBookingProps) => {
  const { onClose } = props;
  const params = useParams();
  const router = useRouter();
  const createBookingMutation = trpc.bookings.createBooking.useMutation();

  const availabilityId = Array.isArray(params?.availabilityId)
    ? params.availabilityId[0]
    : params?.availabilityId;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const notifySuccess = () => toast.success("Slot successfully booked!");

  const handleSubmit = async () => {
    const newErrors = { firstName: "", lastName: "", email: "" };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    const emailValue = formData.email;
    if (!emailValue) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.lastName && !newErrors.email) {
      setIsSubmitting(true);
      const userId = "cmazqg2gn0000f0qclgj098ns";

      try {
        await createBookingMutation.mutateAsync({
          userId,
          inviteeFirstName: formData.firstName,
          inviteeLastName: formData.lastName,
          inviteeEmail: formData.email,
          eventTypeId: "cmazqg2gn0001f0qccjeqjp0k",
          availabilityId: availabilityId ?? "",
        });
        notifySuccess();
        setTimeout(() => {
          setIsSubmitting(false);
          router.push(`/book/${availabilityId}/confirm`);
        }, 1000);
      } catch (error: any) {
        setIsSubmitting(false);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const errorClass = "text-red-500 text-sm w-full";

  return (
    <Modal>
      <h1 className="text-2xl">Confirm your booking</h1>
      <TextInput
        label="First name"
        type="text"
        error={errors.firstName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Last name"
        type="text"
        error={errors.lastName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Email"
        type="email"
        error={errors.email}
        onChange={handleInputChange}
      />
      <div className="flex justify-start w-full gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`${isSubmitting ? "bg-light-blue " : "bg-electric-blue"} text-white rounded-md py-2 px-6 mt-4 ${!isSubmitting && "hover:bg-light-blue"} `}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            "Confirm"
          )}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onClose}
          className={`bg-light-gray ${isSubmitting ? "text-gray-500" : "text-black"} rounded-md py-2 px-6 mt-4 ${!isSubmitting && "hover:bg-light-blue"}`}
        >
          Cancel
        </button>
        <Toaster />
      </div>
    </Modal>
  );
};

export default ModalConfirmBooking;
