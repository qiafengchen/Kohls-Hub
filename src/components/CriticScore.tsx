import { Badge } from '@chakra-ui/react';

interface Props {
  score: number;
}
const CriticScore = ({ score }: Props) => {
  let color =
    score > 4 ? 'green' : score > 3 ? 'blue' : score > 3 ? 'yellow' : 'red';

  return (
    <Badge
      colorScheme={color}
      fontSize={'14px'}
      paddingX={2}
      borderRadius={'4px'}
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
