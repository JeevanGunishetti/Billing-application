import React,{useState} from "react";
import Layout from "./Layout";
import { Link} from "react-router-dom";
// import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper'
import "./Home.css";

import image1 from './images/image6.jpg';
import image2 from './images/image7.jpg';
import image3 from './images/image1.jpg';

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
    <div className="d-flex justify-content-center">
    <Swiper {...HeroSliderConfigs} getSwiper={setParallaxSwiper}>
    <div className="hero-slide">
      <div
        className="slide-image"
        data-swiper-parallax={parallaxAmount}
        data-swiper-parallax-opacity={parallaxOpacity}
      >
        <img src={image3} alt="image1" className="w-100 h-100"></img>
      </div>
      <div className="col-md-6 offset-md-3 my-auto text-center text-white" style={{color:"#dd2c00", "fontSize":20}}>
          <h1 className="text-uppercase mb-2 font-weight-bold mt-5 pt-5">Billing application</h1>
          <p className="mb-5 font-weight-bold">
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
        <img src={image2} alt="image2" className="w-100 h-100"></img>
      </div>
      <div className="col-md-6 offset-md-3 my-auto text-center text-dark " style={{color:"#dd2c00"}}>
        <p className="font-weight-bold mb-5" style={{"fontSize":24}}>
          This application is compatible for small and medium scale businesses.
        </p>

        <Link
          to="/signup"
          className="btn btn-success mt-3"
        >
          Signup
        </Link>
      </div>
    </div>
    </Swiper>

    </div>

    </Layout>
  );
}

export default Home;
//
// <div className="position-absolute">
//   <img src={image1} alt="image1" className="w-100 h-100"></img>
// </div>
// <div className="text-warning position-relative text-center mb-0">
//       <h1 className="text-uppercase mb-2 font-weight-bold">Billing application</h1>
//       <p className="mb-5 small font-weight-bold">
//         This is the place where you can do the hazzle free billing and store the data securely for
//         for really long time at free of cost.
//       </p>
//
//         <Link className="btn btn-success" to="/About" >
//           Know More!
//           <i className="fas fa-chevron-right" />
//         </Link>
//
//     </div>
