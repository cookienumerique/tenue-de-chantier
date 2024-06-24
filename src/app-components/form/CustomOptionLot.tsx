import { Box } from '@chakra-ui/react';
import React, { MouseEvent } from 'react';
import { components, OptionProps } from 'react-select';

import Text from '@/components/text/TextPrimary';
import LabelValue from '@/interfaces/LabelValue';

const CustomOptionLot: React.FC<
  OptionProps<LabelValue, false>
> = (props) => {
  const { data } = props;
  const { contactNotDefined, lotId, zacId } =
    data?.meta ?? {};

  /**
   * @description Handle click on option
   * @param e
   */
  const handleClick = (
    e: MouseEvent<HTMLParagraphElement>
  ) => {
    if (contactNotDefined) {
      e.stopPropagation();
      window.open(
        `https://data.epa-marnelavallee.fr/lots/rc.php?id_zac=${zacId}&id=${lotId}`
      );
      return;
    }
  };
  return (
    <components.Option {...props}>
      <Text onClick={handleClick}>
        {`${data?.label} `}
        {contactNotDefined && (
          <Box
            as="span"
            color="primary.500"
            fontSize="sm"
          >
            <br />
            Cliquez ici pour renseigner le nom et le mail
            du contact.
          </Box>
        )}
      </Text>
    </components.Option>
  );
};

export default CustomOptionLot;
