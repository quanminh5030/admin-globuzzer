import React, { useEffect, useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import CarouselCard from './CarouselCard';
import { GetWindowDimension } from "../../utils/GetWindowDimension";

const KeenSlider = (props) => {
 const { 
    data,
    editStyle,
    getCurrentVideo,
    cityId,
    showDeleteForm,
    setShowVideoForm,
    currentSlide,
    setCurrentSlide
  } = props
  const { width } = GetWindowDimension();
  const [slides, setSlides] = useState(1);
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider(
    { slidesPerView: slides, 
      loop: true,
      centered: true,
      initial: currentSlide,
      slideChanged(s) {
        setCurrentSlide(s.details().relativeSlide)
      },
    });
console.log(currentSlide)
    const noSlides = () => {
      return width > 1100 ? 3 : 1;
    };
  
    useEffect(() => {
      setSlides(noSlides());
    }, [width]);

  return (
    <>
      { data && sliderRef && slider ? (
        <div ref={sliderRef} className="keen-slider">
          {data.map((d, i) => (
              <div 
                key={d.id} 
                className="keen-slider__slide"
                onClick={() => getCurrentVideo(d.id)}
                style={editStyle}
              >
                <CarouselCard 
                  item={d}
                  currentSlide={currentSlide}
                  slideIndex={i}
                  videos={data}
                  cityId={cityId}
                  showDeleteForm={showDeleteForm}
                  setShowVideoForm={setShowVideoForm}
                  render={props.render}
                />
              </div>
            ))}
        </div>
      ) : <div>Loading...</div> }
    </>
  );
};

export default KeenSlider;