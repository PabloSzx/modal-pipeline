import { ReactNode } from "react";
import { proxy, ref } from "valtio";

export const ModalState = proxy<{
  isOpen: boolean;
  onClose?: () => void;
  content: { current?: ReactNode };
}>({
  isOpen: false,
  onClose: undefined,
  content: ref({ current: undefined }),
});
