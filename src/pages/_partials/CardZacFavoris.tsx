import { Stack } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { ReactElement } from 'react';

import SelectZac from '@/app-components/form/SelectZac';
import IconFavoris from '@/app-components/icon/IconFavoris';
import ListZacFavoris from '@/app-components/zac-favoris/ListZacFavoris';
import Section from '@/components/section/Section';
import useCreateZacFavoris from '@/hooks/zac-favoris/useCreateZacFavoris';
import useFindZacFavoris from '@/hooks/zac-favoris/useFindZacFavoris';
import LabelValue from '@/interfaces/LabelValue';

export default function CardZacFavoris(): ReactElement {
  const {
    data: zacFavoris,
    isLoading,
    isError,
    invalidate: invalidateZacFavoris,
  } = useFindZacFavoris();

  const {
    mutate: createZacFavoris,
    isLoading: isLoadingCreateZacFavoris,
  } = useCreateZacFavoris({
    callbackOnSuccess: invalidateZacFavoris,
  });

  const handleSubmit = ({
    zacId,
  }: {
    zacId: LabelValue;
  }) => {
    if (!zacId) return;
    createZacFavoris({
      zac_id: zacId?.value?.toString(),
    });
  };

  const form = useForm({
    onValidSubmit: handleSubmit,
  });

  return (
    <Section
      title="ZAC en favoris"
      flex="1"
    >
      <Formiz connect={form}>
        <Stack
          direction="row"
          alignItems="end"
        >
          <SelectZac />
          <IconFavoris
            variant="remove"
            onClick={form.submit}
            isLoading={isLoadingCreateZacFavoris}
          />
        </Stack>
      </Formiz>
      <ListZacFavoris
        isLoading={isLoading}
        isError={isError}
        zacFavoris={zacFavoris}
        callbackOnSuccessDelete={invalidateZacFavoris}
      />
    </Section>
  );
}
