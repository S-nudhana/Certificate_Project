import { useToast } from "@chakra-ui/react";

export const useCustomeToast = () => {
    const toast = useToast();
    return (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading") => {
        toast({
            title,
            description,
            status,
            duration: 2000,
            isClosable: true,
        });
    };
};
