import { Alert } from '@chakra-ui/react';

/**
 * @description Alert error fetch data
 * @constructor
 */
const AlertErrorFetchData = () => {
  return (
    <Alert status="error">
      Une erreur est survenue lors de la récupération des
      données
    </Alert>
  );
};

export default AlertErrorFetchData;
