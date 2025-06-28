import * as yup from "yup";

export type ModalProps = {
  onConfirm?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};
