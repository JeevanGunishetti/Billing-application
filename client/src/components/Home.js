import React,{useState} from "react";
import Layout from "./Layout";
import { Link} from "react-router-dom";
// import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper'
import "./Home.css";

import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';

const HeroSliderConfigs = {
  containerClass: 'swiper-container hero-slider',
  parallax: true,
  centeredSlides: true,
  grabCursor: true,
  speed: 500,
  spaceBetween: 0,
  effect: 'slide'
};

function Home() {

 const [parallaxSwiper, setParallaxSwiper] = useState(null);
 const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0;
 const parallaxOpacity = 0.5;

  return (
    <Layout>
    <div className="d-flex justity-content-center align-items-center w-100 h-100 mt-2">
    <Swiper {...HeroSliderConfigs} getSwiper={setParallaxSwiper}>
    <div className="hero-slide">
      <div
        className="slide-image"
        data-swiper-parallax={parallaxAmount}
        data-swiper-parallax-opacity={parallaxOpacity}
      >
        <img src={image1} alt="image1"></img>
      </div>
      <div className="col-md-6 offset-md-3 my-auto text-center text-white">
          <h1 className="text-uppercase mb-2 font-weight-bold">Billing application</h1>
          <p className="mb-5 small">
            This is the place where you can do the hazzle free billing and store the data securely for
            for really long time at free of cost.
          </p>

            <Link className="btn btn-success" to="/About" >
              Know More!
              <i className="fas fa-chevron-right" />
            </Link>

        </div>
    </div>
    <div className="hero-slide my-5 h-0">
      <div
        className="slide-image"
        data-swiper-parallax={parallaxAmount}
        data-swiper-parallax-opacity={parallaxOpacity}
      >
        <img src={image2} alt="image2"></img>
      </div>
      <div className="col-md-6 offset-md-3 my-auto text-center" style={{color:"#e36105"}}>
        <h1 className="text-uppercase mb-2 font-weight-bold">Slide 1</h1>
        <p className="mb-5 small">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
          ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
          ab quia neque, porro laborum error, autem facilis voluptates
          laboriosam?
        </p>
      </div>
    </div>
  </Swiper>
    </div>

    </Layout>
  );
}

export default Home;

//
// //
// <Swiper {...HeroSliderConfigs} getSwiper={setParallaxSwiper}>
// <div className="hero-slide">
//   <div
//     className="slide-image w-100 h-100"
//     data-swiper-parallax={parallaxAmount}
//     data-swiper-parallax-opacity={parallaxOpacity}
//   >
//     <img src={image1} alt="image1"></img>
//   </div>
//   <div className="col-md-6 offset-md-3 my-auto text-center text-white">
//     <h1 className="text-uppercase mb-2 font-weight-bold">Billing application</h1>
//     <p className="mb-5 small">
//       This is the place where you can do the hazzle free billing and store the data securely for
//       for really long time at free of cost.
//     </p>
//
//       <Link className="btn btn-primary" to="/About" >
//         Learn More!
//         <i className="fas fa-chevron-right" />
//       </Link>
//
//   </div>
// </div>
// </Swiper>
