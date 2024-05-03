import {
  ResponsiveValue,
  Spinner,
} from '@chakra-ui/react';
import { MouseEvent, ReactElement } from 'react';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
} from 'react-icons/md';

import IconButton from '@/components/button/IconButton';
import { theme } from '@/config/theme';

type IconFavorisProps = {
  variant: 'add' | 'remove';
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  size?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xl'>;
};
/**
 * @description Icon for add or remove from favorites
 * @param props
 * @constructor
 */
export default function IconFavoris(
  props: IconFavorisProps
): ReactElement {
  const {
    variant,
    onClick,
    isLoading = false,
    size = 'sm',
  } = props;
  const { colors } = theme;

  const commonProps = {
    color: 'white',
    size: 18,
  };

  return (
    <IconButton
      backgroundColor={colors?.primary[500]}
      size={size}
      label={
        variant === 'add'
          ? 'Enlever des favoris'
          : 'Ajouter aux favoris'
      }
      aria-label={variant === 'add' ? 'add' : 'remove'}
      icon={
        variant === 'add' ? (
          <MdFavoriteBorder {...commonProps} />
        ) : (
          <MdOutlineFavorite {...commonProps} />
        )
      }
      onClick={(e) => onClick(e)}
      disabled
      isLoading={isLoading}
      spinner={
        <Spinner
          {...commonProps}
          size="sm"
        />
      }
    />
  );
}
