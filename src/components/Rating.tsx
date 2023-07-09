import React from 'react';
import { Box, HStack, Text, useToast } from '@chakra-ui/react';
import ReactStars from 'react-stars';

interface Props {
  rate: string;
  count: number;
}

const Rating = ({ rate, count }: Props) => {
  const toast = useToast();

  return (
    <HStack>
      <ReactStars
        count={5}
        value={parseFloat(rate)}
        onChange={() => {
          toast({
            title: 'Rating Submitted.',
            description: '',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }}
        size={24}
        isHalf={true}
        activeColor="#ffd700"
      />
      <Text fontSize={'14px'} fontWeight={'medium'}>
        {rate} ({count})
      </Text>
    </HStack>
  );
};

export default Rating;
