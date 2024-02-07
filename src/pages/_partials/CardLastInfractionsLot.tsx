import { useRouter } from 'next/router';

import Section from '@/components/section/Section';
import useFindLastInfractionsLot from '@/hooks/infractionLots/useFindLastInfractionsLot';
import ListLastInfractionsLot from '@/pages/_partials/ListLastInfractionsLot';

export default function CardLastInfractionsLot() {
  const {
    data: infractionsLot,
    isLoading: isLoadingInfractions,
    isError: isErrorInfractions,
  } = useFindLastInfractionsLot();

  const { push } = useRouter();

  /**
   * @description When click on row, redirect to infraction-lot page
   * @param id
   */
  const onRowClick = (id: string) =>
    push(`/infractions-lots/${id}`);

  return (
    <Section
      title="Dernières infractions enregistrées"
      flex="1"
    >
      <ListLastInfractionsLot
        isLoading={isLoadingInfractions}
        isError={isErrorInfractions}
        infractionsLot={infractionsLot}
        onRowClicked={onRowClick}
      />
    </Section>
  );
}
