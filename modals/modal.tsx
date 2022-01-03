import {
  Box,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useSnapshot } from "valtio";
import { createDeferredPromise } from "../utils/promise";
import { ModalState } from "./state";

export function GlobalModal() {
  const { isOpen, content } = useSnapshot(ModalState);

  const onClose = useCallback(() => {
    ModalState.isOpen = false;
    ModalState.onClose?.();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {content.current}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function FirstModalContent({ onContent }: { onContent: (value: string) => void }) {
  const [content, setContent] = useState<string>("");

  return (
    <Stack>
      <Box>First Modal</Box>
      <Input
        value={content}
        onChange={(ev) => {
          setContent(ev.target.value);
          onContent(ev.target.value);
        }}
      />
    </Stack>
  );
}

export function OpenFirstModal() {
  const firstModal = createDeferredPromise<string>();

  let value: string;
  ModalState.isOpen = true;
  ModalState.content.current = (
    <FirstModalContent
      onContent={(inputValue) => {
        value = inputValue;
      }}
    />
  );
  ModalState.onClose = () => {
    firstModal.resolve(value);
  };

  return firstModal.promise;
}

function SecondModalContent({ onContent }: { onContent: (value: string) => void }) {
  const [content, setContent] = useState<string>("");

  return (
    <Stack>
      <Box>Second Modal</Box>
      <Input
        value={content}
        onChange={(ev) => {
          setContent(ev.target.value);
          onContent(ev.target.value);
        }}
      />
    </Stack>
  );
}

export function OpenSecondModal() {
  const secondModal = createDeferredPromise<string>();

  let value: string;
  ModalState.isOpen = true;
  ModalState.content.current = (
    <SecondModalContent
      onContent={(inputValue) => {
        value = inputValue;
      }}
    />
  );
  ModalState.onClose = () => {
    secondModal.resolve(value);
  };

  return secondModal.promise;
}
