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
    { label: 'Featured', value: '1' },
    { label: 'New Arrivals', value: '2' },
    { label: 'Best Sellers', value: '3' },
    { label: 'Price Low-High', value: '4' },
    { label: 'Price High-Low', value: '5' },
    { label: 'Highest Rated', value: '6' },
    { label: 'Percent Off', value: '7' },
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
