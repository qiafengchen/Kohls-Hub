import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

export interface Order {
  value: string;
  label: string;
}
interface Props {
  selectedOrdering: Order | null;
  onSelectedOrdering: (order: Order | null) => void;
}

const SortSelector = ({ selectedOrdering, onSelectedOrdering }: Props) => {
  const orderings = [
    { label: 'Relevance', value: '' },
    { label: 'Name', value: 'name' },
    { label: 'Release date', value: '-released' },
    { label: 'Date Added', value: '-added' },
    { label: 'Created Date', value: '-created' },
    { label: 'Updated Date', value: '-updated' },
    { label: 'Average Rating', value: 'rating' },
    { label: 'Popularity', value: '-metacritic' },
  ];
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {`Order by: ${selectedOrdering?.label || 'Relevance'}`}
      </MenuButton>
      <MenuList>
        {orderings.map((order) => (
          <MenuItem key={order.label} onClick={() => onSelectedOrdering(order)}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
