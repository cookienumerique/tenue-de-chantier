import {
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { ReactElement } from 'react';

import LayoutLarge from '@/components/layout/_partials/LayoutLarge';
import LayoutMobile from '@/components/layout/_partials/LayoutMobile';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

export default function Layout(
  props: LayoutProps
): ReactElement {
  const { children } = props;
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const layout = isMobile ? LayoutMobile : LayoutLarge;
  const content = (
    <Stack
      flex="1"
      zIndex={0}
    >
      <Head>
        <link
          rel="icon"
          href="/images/favicon.ico"
        />
      </Head>
      {children}
    </Stack>
  );

  // eslint-disable-next-line
  return React.createElement(layout, {
    flex: 1,
    gap: 0,
    children: content,
  });
}
