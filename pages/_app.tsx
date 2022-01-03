import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { GlobalModal } from "../modals/modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalModal />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
