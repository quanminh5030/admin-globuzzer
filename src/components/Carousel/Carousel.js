import React, { useState } from 'react';
import './styles.css';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import CarouselCard from './CarouselCard';

const KeenSlider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, slider] = useKeenSlider(
    { slidesPerView: 3, 
      loop: true,
      centered: true,
      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.details().relativeSlide)
      },
    }
    );

  return (
      <div ref={sliderRef} className="keen-slider">
        {data.map((d, i) => (
            <div 
              key={d.id} 
              className="keen-slider__slide" 
              onClick={() => console.log(currentSlide, i)}
            >
              <CarouselCard item={d}/>
            </div>
          ))}
      </div>
  );
};

export default KeenSlider;