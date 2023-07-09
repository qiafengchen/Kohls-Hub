import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

interface Props {
  images: { altText: string; url: string }[];
}
const Carousels = ({ images }: Props) => {
  return (
    <Carousel>
      {images.map((img) => (
        <div>
          <img src={img.url} alt={img.altText} />
        </div>
      ))}
    </Carousel>
  );
};

export default Carousels;
