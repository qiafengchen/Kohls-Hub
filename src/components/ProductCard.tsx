import React from 'react';
import {
  Card,
  Image,
  CardBody,
  Heading,
  HStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { Product } from '../hooks/useProducts';
import CriticScore from './CriticScore';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <Image src={product.image.url} />
      <CardBody
        minHeight={'190px'}
        display={'flex'}
        flexDirection={'column-reverse'}
        justifyContent={'space-around'}
      >
        <HStack justifyContent={'space-between'} marginBottom={3}>
          {/* <PlatformIconList
            platforms={game?.parent_platforms?.map((p) => p.platform)}
          /> */}
          <Box display={'flex'}>
            {' '}
            <Text marginRight={1}>Price:</Text>{' '}
            <Text fontWeight={'bold'}>
              {product.prices[0].regularPrice.maxPrice
                ? `$${product.prices[0].regularPrice.minPrice} - $${product.prices[0].regularPrice.maxPrice}`
                : `$${product.prices[0].regularPrice.minPrice}`}
            </Text>
          </Box>
          <Box display={'flex'}>
            <Text marginRight={1}>Rating:</Text>{' '}
            <CriticScore score={product.rating.avgRating} />
          </Box>
        </HStack>
        <Heading fontSize={'sm'}>
          {product.productTitle}
          {/* <Emoji rating={product.rating.avgRating} /> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
