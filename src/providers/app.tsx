import {
  ChakraProvider,
  GlobalStyle,
  Stack,
} from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { theme } from '@/config/theme';
import { AuthentificationProvider } from '@/context/AuthentificationProvider';
import { CheckAuthentification } from '@/context/CheckAuthentification';

// const myFont = localFont({
//   src: '',
// });

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: false,
      },
      mutations: {
        useErrorBoundary: false,
      },
    },
  });

  return (
    <ChakraProvider
      resetCSS
      theme={theme}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthentificationProvider>
          <CheckAuthentification>
            <GlobalStyle />
            <Stack
              // className={myFont.className}
              id="__next"
              height="100%"
            >
              {children}
            </Stack>
          </CheckAuthentification>
        </AuthentificationProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
