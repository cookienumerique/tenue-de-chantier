import {
  Card as CardChakra,
  CardBody,
  CardHeader,
  CardProps as CardChakraProps,
  SkeletonText,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';

import AlertErrorFetchData from '@/components/alert/AlertErrorFetchData';

type CardProps = {
  isLoading: boolean;
  isError: boolean;
  children: ReactElement | ReactElement[];
  title: string;
  propsHeader?: StackProps;
  cardProps?: CardChakraProps;
  icon?: ReactElement;
  color?: string;
} & CardChakraProps;

/**
 * @description Template de carte
 */
export default function Card(
  props: CardProps
): ReactElement {
  const {
    isLoading = false,
    children,
    isError = false,
    propsHeader = {},
    title,
    cardProps,
    icon,
    color = 'gray.700',
  } = props;

  const paddingY = '2xs';
  const paddingX = 'xs';

  if (isError) {
    return <AlertErrorFetchData />;
  }

  return (
    <CardChakra
      variant="elevated"
      borderRadius="xl"
      border="2px solid"
      borderColor={color}
      backgroundColor={color}
      height="100%"
      boxShadow="lg"
      {...cardProps}
    >
      {title ? (
        <CardHeader
          borderTopRadius="inherit"
          fontWeight="bold"
          color="white"
          paddingX={paddingX}
          paddingY={paddingY}
          {...propsHeader}
        >
          <Stack
            flexDir="row"
            alignItems="center"
            spacing="sm"
          >
            {icon}
            <Text>{title}</Text>
          </Stack>
        </CardHeader>
      ) : (
        <></>
      )}

      <CardBody
        borderBottomRadius="inherit"
        paddingX={paddingX}
        paddingY={paddingX}
        backgroundColor="white"
      >
        <Stack spacing="2xs">
          {isLoading ? (
            <SkeletonText
              noOfLines={4}
              spacing="xs"
              skeletonHeight="3"
            />
          ) : (
            children
          )}
        </Stack>
      </CardBody>
    </CardChakra>
  );
}
