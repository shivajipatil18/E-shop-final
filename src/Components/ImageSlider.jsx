import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from '../assets/Images/TopProducts/banner.jpg'
import banner1 from '../assets/Images/TopProducts/banner1.jpg'
import banner2 from '../assets/Images/TopProducts/banner2.jpg'

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={banner} alt="Banner 1" className="h-[400px] w-full object-cover" />
      </div>
      <div>
        <img src={banner1} alt="Banner 2" className="h-[400px] w-full object-cover" />
      </div>
      <div>
        <img src={banner2} alt="Banner 3" className="h-[400px] w-full object-cover" />
      </div>
    </Slider>
  );
};

export default ImageSlider;