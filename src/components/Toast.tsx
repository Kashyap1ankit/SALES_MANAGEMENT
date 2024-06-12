import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function ToastExample({ message }: { message: string }) {
  const toast = useToast();
  let hasMountendOnce = useRef(false);
  useEffect(() => {
    if (hasMountendOnce.current) {
      toast({
        title: message,
        status: "error",
        duration: 3000,
        position: "bottom-right",
        isClosable: true,
      });
    }
    hasMountendOnce.current = true;
  }, []);
  return <></>;
}
