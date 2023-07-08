import useData from './useData';

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

const useGenres = () => {
  const { data: genres, error, isLoading } = useData<Genre>('/genres');

  return { genres, error, isLoading };
};

export default useGenres;
