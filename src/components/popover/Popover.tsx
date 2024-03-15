import {
  Button,
  ButtonProps,
  Popover as PopoverChakra,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

import ButtonCancel from '@/app-components/button/ButtonCancel';

type PopoverProps = {
  propsConfirm?: ButtonProps;
  propsCancel?: ButtonProps;
  triggerProps?: { label: string } & ButtonProps;
  children: ReactElement;
};

export default function Popover(
  props: PopoverProps
): ReactElement {
  const {
    triggerProps,
    propsConfirm,
    propsCancel,
    children,
  } = props;
  return (
    <PopoverChakra>
      {({ onClose }: { onClose: () => void }) => (
        <>
          <PopoverTrigger>
            <Button
              width={{
                base: '100%',
                sm: 'fit-content',
              }}
              type="button"
              colorScheme="primary"
              {...triggerProps}
            >
              {triggerProps?.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Stack gap="2xs">{children}</Stack>
            </PopoverBody>
            <PopoverFooter>
              <Stack
                direction={{ md: 'row' }}
                justifyContent="end"
              >
                <ButtonCancel
                  onClick={onClose}
                  width={{
                    base: '100%',
                    sm: 'fit-content',
                  }}
                  {...propsCancel}
                />

                <Button
                  width={{
                    base: '100%',
                    sm: 'fit-content',
                  }}
                  type="button"
                  colorScheme="green"
                  {...propsConfirm}
                >
                  Confirmer
                </Button>
              </Stack>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </PopoverChakra>
  );
}
