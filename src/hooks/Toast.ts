import { useToasts } from "react-toast-notifications";

export const Toast = () => {
  const { addToast } = useToasts();

  const show = (
    message: string,
    appearance: "success" | "error" | "info" | "warning" ,
    moreConfig: any = {}
    ) => {
    addToast(message, { appearance, ...moreConfig });
  }

  return { show }
};
