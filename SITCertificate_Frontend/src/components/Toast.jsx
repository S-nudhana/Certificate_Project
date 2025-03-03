import { useToast } from "@chakra-ui/react";

export const Toast = (title, description, status) => {
    const toast = useToast();
    toast({
        title: title,
        description: description,
        status: status,
        duration: 2000,
        isClosable: true,
    });
}