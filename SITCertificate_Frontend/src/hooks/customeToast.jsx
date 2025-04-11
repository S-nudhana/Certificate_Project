import { useToast } from "@chakra-ui/react";

export const useCustomeToast = () => {
    const toast = useToast();
    return (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 2000,
            isClosable: true,
        });
    };
};
