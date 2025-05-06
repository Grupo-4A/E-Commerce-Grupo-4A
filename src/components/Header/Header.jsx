import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Header.module.css';
import producto1 from '../../assets/coding-screen.jpg';
import producto2 from '../../assets/hard-disk.jpg';
import producto3 from '../../assets/ram.png';


const Header = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
return(
    <div className={styles.headerContainer}>
  <div className={styles.header}>
    <div className={styles.leftColumn}>
      <div className={styles.headerLeft}>
        <div className={styles.titleOverlay}>Software</div>
            <Slider {...settings}>
                <div className={styles.slide}>
                    <img src={producto1} alt="Software" />
                    <div className={styles.overlay}></div>
                </div>
                <div className={styles.slide}>
                    <img src={producto2} alt="Software 2" />
                    <div className={styles.overlay}></div>
                </div>
            </Slider>
      </div>
      <div className={styles.headerLeft}>
        <div className={styles.titleOverlay}>Hardware</div>
        <Slider className={styles.slide}{...settings}>
                <div className={styles.slide}>
                            <img src={producto1} alt="Software" />
                            <div className={styles.overlay}></div>
                        </div>
                <div className={styles.slide}>
                    <img src={producto2} alt="Software 2" />
                    <div className={styles.overlay}></div>
                </div>
        </Slider>
      </div>
    </div>

    <div className={styles.headerRight}>
    <div className={styles.titleOverlay}>Plantillas</div>
      <Slider {...settings}>
      <div className={styles.slideRight}>
                            <img src={producto1} alt="Software" />
                            <div className={styles.overlay}></div>
                        </div>
                <div className={styles.slideRight}>
                    <img src={producto2} alt="Software 2" />
                    <div className={styles.overlay}></div>
                </div>
        <div className={styles.slideRight}><img src={producto3} alt="Producto 3" /><div className={styles.overlay}></div></div>
      </Slider>
    </div>
  </div>
</div>
);
};

export default Header;