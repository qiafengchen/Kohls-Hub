import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}
const ProductCardContainer = ({ children }: Props) => {
  return (
    <Box width="100%" borderRadius={10} overflow={'hidden'}>
      {children}
    </Box>
  );
};

export default ProductCardContainer;
