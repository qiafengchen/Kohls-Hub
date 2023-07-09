import React from 'react';
import {
  Card,
  Image,
  CardBody,
  Heading,
  HStack,
  Text,
  Box,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Product } from '../hooks/useProducts';
import CriticScore from './CriticScore';
import ProductDetail from './ProductDetail';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [selectedProductID, setSelectedProductID] = React.useState<
    string | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card
        onClick={() => {
          onOpen();
          setSelectedProductID(product.webID);
        }}
      >
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
            {product.rating.avgRating && (
              <Box display={'flex'}>
                <Text marginRight={1}>Rating:</Text>{' '}
                <CriticScore score={product.rating.avgRating} />
              </Box>
            )}
          </HStack>
          <Heading fontSize={'sm'}>
            {product.productTitle}
            {/* <Emoji rating={product.rating.avgRating} /> */}
          </Heading>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        {' '}
        <ModalOverlay />
        <ModalContent>
          <ProductDetail
            selectedProductID={selectedProductID}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
