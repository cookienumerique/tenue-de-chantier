import { Spinner } from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
} from 'react-icons/md';

import IconButton from '@/components/button/IconButton';
import { theme } from '@/config/theme';

type IconFavorisProps = {
  variant: 'add' | 'remove';
  onClick: () => void;
  isLoading: boolean;
};
/**
 * @description Icon for add or remove from favorites
 * @param props
 * @constructor
 */
export default function IconFavoris(
  props: IconFavorisProps
): ReactElement {
  const { variant, onClick, isLoading = false } = props;
  const { colors } = theme;

  const commonProps = {
    color: colors?.primary[500],
    size: 20,
  };

  return (
    <IconButton
      colorScheme="none"
      label={
        variant === 'add'
          ? 'Ajouter aux favoris'
          : 'Enlever des favoris'
      }
      aria-label={variant === 'add' ? 'add' : 'remove'}
      icon={
        variant === 'add' ? (
          <MdFavoriteBorder {...commonProps} />
        ) : (
          <MdOutlineFavorite {...commonProps} />
        )
      }
      onClick={onClick}
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
