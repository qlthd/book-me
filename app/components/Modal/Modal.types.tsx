import * as yup from "yup";

export type ModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email requis"),
});

export type ForgotPasswordFormValues = {
  email: string;
};
