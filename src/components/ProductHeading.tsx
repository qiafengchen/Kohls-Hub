import React from 'react';
import { Heading } from '@chakra-ui/layout';
import { GameQuery } from '../App';

interface Props {
  gameQuery: GameQuery;
}
const ProductHeading = ({ gameQuery }: Props) => {
  const heading = `${gameQuery.category?.name || ''} ${
    gameQuery.searchText || ''
  } Products`;

  return (
    <Heading as="h1" marginY={5} fontSize={'5xl'}>
      {heading}
    </Heading>
  );
};

export default ProductHeading;
