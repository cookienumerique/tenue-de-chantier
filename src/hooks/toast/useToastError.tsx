import { ToastProps, useToast } from '@chakra-ui/react';

/**
 * @description Toast d'erreur
 */
export default function useToastError(): (
  props: ToastProps
) => string | number {
  const toast = useToast();
  return (props: ToastProps) => {
    const { title, description } = props;
    return toast({
      title,
      description,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };
}
