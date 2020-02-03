import { useToasts } from "react-toast-notifications";

export const Toast = ({
  message,
  appearance,
  moreConfig
}: any) => {
  const { addToast } = useToasts();

  const toast = () => {
    addToast(message, { appearance, ...moreConfig });
  }

  return toast;
};
