import { Button, Stack } from "@chakra-ui/react";
import { OpenFirstModal, OpenSecondModal } from "../modals/modal";

export default function Hello() {
  return (
    <Stack>
      <Button
        onClick={async () => {
          const content1 = await OpenFirstModal();

          const content2 = await OpenSecondModal();

          alert(
            JSON.stringify(
              {
                content1,
                content2,
              },
              null,
              2
            )
          );
        }}
      >
        Open Modals
      </Button>
    </Stack>
  );
}
