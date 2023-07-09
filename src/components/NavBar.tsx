import {
  HStack,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
import CategoryList from './CategoryList';
import useWindowResize from '../hooks/useWindowsSize';
import { Category } from '../hooks/useCategories';

interface Props {
  onSearch: (search: string) => void;
  onSelectCategory: (genre: Category) => void;
  selectedCategory: Category | null;
}

const NavBar = ({ onSearch, onSelectCategory, selectedCategory }: Props) => {
  const { width } = useWindowResize({ debounce: 200 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = width <= 990;

  return (
    <HStack padding={'10px'}>
      <Image
        src={logo}
        boxSize={'60px'}
        cursor={isMobile ? 'pointer' : ''}
        onClick={() => {
          if (isMobile) onOpen();
        }}
      />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <CategoryList
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              onCloseDrawer={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
