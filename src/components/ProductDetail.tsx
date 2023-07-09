import React from 'react';
import {
  Card,
  Image,
  CardBody,
  useToast,
  HStack,
  Text,
  Box,
  Divider,
  Button,
  Spinner,
  Tooltip,
  Grid,
  GridItem,
  Tag,
  useColorMode,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import apiClient from '../services/api-client';
import Rating from './Rating';
import Carousels from './Carousels';

interface Props {
  selectedProductID: string | null;
  onClose: () => void;
}

interface SKU {
  availability: string;
  images: { url: string; altText: string }[];
  price: {
    regularPrice: {
      minPrice: number;
    };
  };
  size: string;
  skuCode: string;
  color: string;
  itemMaxAvailableCount: number;
  maxQuantityMessage: string;
}

interface Product {
  SKUS: SKU[];
  productTitle: string;
  images: { altText: string; url: string }[] | [];
  description: {
    shortDescription: string;
    longDescription: string;
  };
  avgRating: string;
  ratingCount: number;
  swatchImages: { color: string; URL: string }[];
  altImages: { altText: string; url: string }[];
}
const ProductDetail = ({
  selectedProductID,
  onClose,
}: Props): JSX.Element | null => {
  const toast = useToast();
  const { toggleColorMode, colorMode } = useColorMode();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [isLoading, setsLoading] = React.useState(false);
  const [showFullDescrition, setShowFullDescription] = React.useState(false);
  const [selectedSKU, setSelectedSKU] = React.useState<SKU | null | undefined>(
    null
  );

  const [selectedColor, setSelectedColor] = React.useState(selectedSKU?.color);
  const [selectedSize, setSelectedSize] = React.useState(selectedSKU?.size);

  const [quantity, setQuantity] = React.useState(1);
  let availability = selectedSKU?.availability === 'In Stock';

  React.useEffect(() => {
    setsLoading(true);
    apiClient
      .get('/products/detail', {
        params: { webID: selectedProductID },
      })
      .then((res) => {
        const product = res.data.payload.products[0];
        setProduct(product);
        setSelectedSKU(
          product.SKUS.find(
            (sku: SKU) => sku.skuCode === product.preSelectedSku
          )
        );
      })
      .catch((err) => {})
      .finally(() => {
        setsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setSelectedColor(selectedSKU?.color);
    setSelectedSize(selectedSKU?.size);
  }, [selectedSKU]);

  React.useEffect(() => {
    setSelectedSKU((prev) =>
      product?.SKUS.find(
        (sku) => sku.color === selectedColor && sku?.size === selectedSize
      )
    );
  }, [selectedColor, selectedSize]);

  if (isLoading) return <Spinner margin={'200px auto'} />;
  if (product)
    return (
      <Card position={'relative'} borderRadius={'5px'}>
        <CloseIcon
          className="closeButton-modal"
          onClick={onClose}
          zIndex={100}
        />
        <Carousels images={[product.images[0], ...product.altImages]} />
        <CardBody>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {product.productTitle}
          </Text>
          <Text
            fontSize={'sm'}
            fontWeight={'light'}
            marginTop={2}
            padding={'0 1rem'}
          >
            {showFullDescrition ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description.longDescription,
                }}
              ></div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description.shortDescription,
                }}
              ></div>
            )}
          </Text>
          <Button
            margin={'5px 0 5px auto'}
            whiteSpace={'normal'}
            textAlign={'left'}
            display={'block'}
            onClick={() => {
              setShowFullDescription((prev) => !prev);
            }}
            fontSize={'16px'}
            variant={'link'}
          >
            {`View ${showFullDescrition ? 'short' : 'full'} description`}
          </Button>
          <Box position="relative" padding="2">
            <Divider />
          </Box>
          <HStack justifyContent={'space-between'} marginBottom={3}>
            <Text fontSize={'20px'} fontWeight={'bold'}>
              $ {selectedSKU?.price.regularPrice.minPrice}
            </Text>
            <Rating rate={product.avgRating} count={product.ratingCount} />
          </HStack>

          {product.swatchImages.length > 0 && (
            <Box>
              <Text marginBottom={1} fontWeight={'bold'}>
                Colors:
              </Text>
              <HStack>
                <Grid templateColumns="repeat(10, 1fr)" gap={2}>
                  {product.swatchImages.map((img) => (
                    <GridItem w="100%" h="10">
                      <Tooltip label={img.color} placement="auto-start">
                        <Image
                          width={'30px'}
                          height={'30px'}
                          className="color-selector"
                          src={img.URL}
                          alt={img.color}
                          border={
                            selectedColor === img.color
                              ? `2px solid ${
                                  colorMode === 'dark' ? 'white' : 'black'
                                }`
                              : `2px solid ${
                                  colorMode === 'dark' ? 'black' : 'white'
                                }`
                          }
                          onClick={() => {
                            setSelectedColor(img.color);
                          }}
                        />
                      </Tooltip>
                    </GridItem>
                  ))}
                </Grid>
              </HStack>
            </Box>
          )}

          <Box>
            <Text margin={1} fontWeight={'bold'}>
              Sizes:
            </Text>
            <HStack>
              <Grid
                display={'flex'}
                flexWrap={'wrap'}
                templateColumns="repeat(auto-fill, minmax(1rem, 15rem))"
                gap={2}
                maxHeight={'150px'}
                overflowY={'auto'}
              >
                {[...new Set(...[product.SKUS.map((sku) => sku.size)])].map(
                  (size) => (
                    <GridItem w="100%" h="10">
                      <Tooltip label={size} placement="top">
                        <Tag
                          width={'100%'}
                          cursor={'pointer'}
                          border={
                            selectedSize === size
                              ? `2px solid ${
                                  colorMode === 'dark' ? 'white' : 'black'
                                }`
                              : 'none'
                          }
                          onClick={() => {
                            setSelectedSize(size);
                          }}
                        >
                          {size}
                        </Tag>
                      </Tooltip>
                    </GridItem>
                  )
                )}
              </Grid>
            </HStack>
          </Box>
          <Box padding={'20px 30%'} margin={'auto'}>
            <HStack>
              <Button
                isDisabled={quantity === 1}
                borderRadius={'50%'}
                onClick={() => {
                  setQuantity((prev) => (prev = prev - 1));
                }}
              >
                -
              </Button>
              <Tag width={'50px'} height={'50px'} borderRadius={'50%'}>
                <Text textAlign={'center'} margin={'auto'}>
                  {quantity}
                </Text>
              </Tag>
              <Button
                borderRadius={'50%'}
                onClick={() => {
                  if (
                    selectedSKU?.itemMaxAvailableCount !== undefined &&
                    selectedSKU?.itemMaxAvailableCount <= quantity
                  ) {
                    toast({
                      title: 'Exceed Available Count',
                      description: selectedSKU.maxQuantityMessage,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    });
                    return;
                  }
                  setQuantity((prev) => (prev = prev + 1));
                }}
              >
                +
              </Button>
            </HStack>
          </Box>
          <Box>
            <Button
              width={'100%'}
              colorScheme="blue"
              isDisabled={!availability}
              onClick={() => {
                toast({
                  title: '',
                  description: 'Item was added to your cart',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                  position: 'top',
                });
                onClose();
              }}
            >
              {availability ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </Box>
        </CardBody>
      </Card>
    );

  return null;
};

export default ProductDetail;
