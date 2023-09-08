import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { styled } from "styled-components"

function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    draggable: true,
    centerMode: true,
    arrows: false,
    centerPadding: "0px"
  }

  return (
    <SliderContainer>
      <Slider {...settings}>
        <img src="img/banner1.png" alt="main-banner" />
        <img src="img/banner2.png" alt="main-banner" />
        <img src="img/banner3.png" alt="main-banner" />
      </Slider>
    </SliderContainer>
  )
}

export default BannerCarousel

const SliderContainer = styled.div`
  width: 100%;
  height: 10%;

  & > .slick-slider {
    & .slick-dots {
      bottom: 25%;
      left: 25%;
      /* bottom: 6rem;
      left: 29.5rem; */
      text-align: start;
      color: #fff;
    }
    & li.slick-active button:before {
      color: #fff;
    }
    & button::before {
      color: #fff;
    }
  }
`
