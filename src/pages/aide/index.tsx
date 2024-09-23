import { Stack, Text, Link } from '@chakra-ui/react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import TitlePage from '@/components/text/TitlePage';

const HelpPage = () => {
  return (
    <Stack>
      <TitlePage>Page d&apos;aide</TitlePage>

      <Stack gap="xs">
        <Text
          fontSize="lg"
          fontWeight="bold"
        >
          Documents
        </Text>
	<Text>
	Documents de référence à télécharger&nbsp;:
	</Text>

<Accordion bg='#fff'>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
          Cahier des Charges des Prescriptions Générales (CPG)
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
		<Link color='teal.500' href='/docs/CPG_EPA_20240301.pdf' isExternal>CPG 2023</Link><br />
		<Link color='teal.500' href='/docs/CPG_EPAMARNE_20140522.pdf' isExternal>CPG 2014 EpaMarne</Link><br />
		<Link color='teal.500' href='/docs/CPG_EPAFRANCE_20140918.pdf' isExternal>CPG 2014 EpaFrance</Link>
    </AccordionPanel>
  </AccordionItem>
</Accordion>

        <Text
          fontSize="lg"
          fontWeight="bold"
        >
          Vidéo tutoriel
        </Text>
        <Text>
        Ici bientôt des vidéos de formation au logiciel Tenue de chantiers.
        </Text>

        <Text
          fontSize="lg"
          fontWeight="bold"
        >
          FAQ
        </Text>
	<Text>
	Ici les réponses aux questions les plus fréquentes. Cette rubrique pourra être enrichie dans le temps avec le retour des utilisateurs.
	</Text>


<Accordion bg='#fff'>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
          1. Comment télécharger et installer l’application ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      L’application peut être utilisée dans votre navigateur, ou être installée sur votre mobile ou tablette. Pour l’installer, connectez-vous avec Chrome, puis cliquez sur «&nbsp;Installer&nbsp;» ou «&nbsp;Ajouter à l’écran d’accueil&nbsp;».
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        2. L’application est-elle compatible avec mon appareil ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        A priori, il suffit d’être connecté à internet pour accéder à l’application.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        3. Comment créer un compte ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Toute création de compte se fait manuellement : renseignez-vous auprès de votre interlocuteur à l’EPA.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        4. Comment réinitialiser mon mot de passe ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Lors de la connexion, vous pouvez cliquer sur le lien «&nbsp;Récupérez votre accès !&nbsp;» présent sur l’écran de connexion (en bas), qui vous permettra de valider votre mot de passe en vérifiant votre adresse mail (si vous ne recevez pas le mail, vérifiez vos courrier indésirables ou votre filtre anti-spam).
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        5. Comment pouvons-nous avoir un compte entreprise plutôt que par utilisateur ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Vous pouvez utiliser une adresse mail générique partagée.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
         6.  Comment sont traitées mes données personnelles ?
         </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
	Pour l’accès et l’utilisation de l’application, EpaMarne-EpaFrance doit enregistrer votre adresse mail et votre numéro de téléphone. Ces données sont traitées par le gestionnaire de l’application ainsi que la société gestionnaire de l’application d’identification.<br />
	Ces données seront anonymisées lors de la suppression de votre compte (sur demande à votre interlocuteur à l’EPA, en cas de fin de contrat etc.)<br />
	Pour exercer vos droits Informatiques et Libertés ou pour toutes questions sur ce traitement de données à caractère personnel, contacter le DPO d’EpaMarne à l’adresse suivante : <Link color='teal.500' href='mailto:dpo@epa-marnelavallee.fr' isExternal>dpo@epa-marnelavallee.fr</Link>. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        7. Comment mettre à jour l’application ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        La mise à jour logicielle est automatique.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        8. Comment synchroniser mes données entre plusieurs appareils ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Pas besoin de synchronisation, toutes les données sont enregistrées dans l’application. Il vous suffit de vous identifier sur vos nouveaux appareils.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        9. Comment intégrer des droits à de nouveaux collaborateurs ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Pour les intervenants extérieurs à l’EPA, les droits d’accès aux infractions sont limités aux opérations dont votre entreprise a la charge. L’affectation des droits est donc automatique. Si votre compte vient d’être créé, n’hésitez pas à vous reconnecter une fois pour récupérer tous les accès.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        10. Comment activer/désactiver les notifications ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Vous recevez sur votre adresse mails de rares notifications paramétrées par défaut. Il n’est pas possible de modifier ces paramètres pour l’instant.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        11. Comment contacter le support EPA ? Comment signaler un bug ou un problème technique ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
	<Text>
	        Pour des questions liées au fonctionnement des procédures : <Link color='teal.500' href='mailto:techniques@epa-marnelavallee.fr' isExternal>techniques@epa-marnelavallee.fr</Link>
	</Text>
	<Text>
	        Pour les questions liées au fonctionnement informatique ou de l’application : <Link color='teal.500' href='mailto:s.beaulieu@epa-marnelavallee.fr' isExternal>s.beaulieu@epa-marnelavallee.fr</Link>
	</Text>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
        12. Comment personnaliser les paramètres de l’application ? Quelles sont les fonctionnalités principales de l’application ?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        Vous pouvez ajouter des ZAC dans vos favoris, pour un accès plus rapide, sur la page d’accueil. Par défaut l’affichage de la carte sur la page d’accueil se fait sur la dernière ZAC avec laquelle vous avez eu une interaction (création ou modification d’une infraction par exemple). Pour connaître le reste des fonctionnalités, vous pouvez accéder à des tutoriels vidéo ci-dessous !
    </AccordionPanel>
  </AccordionItem>


</Accordion>

      </Stack>
    </Stack>
  );
};

HelpPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <Layout>{page}</Layout>;
};
export default HelpPage;
