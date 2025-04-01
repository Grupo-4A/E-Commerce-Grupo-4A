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
            <div className={styles.headerLeft}>
                <h1 className={styles.title}>Todo lo que necesitas para desarrolar, diseñar y crear,
                     en un solo lugar
                </h1>
                
                <button className={styles.buttons}>Software</button>
                <button className={styles.buttons}>Hardware</button>
                <button className={styles.buttons}>Plantilla Frontend</button>
            </div>
           <div className={styles.headerRight}>
                <Slider {...settings}>
                    <div><img src={producto1} alt="Producto 1" /></div>
                    <div><img src={producto2} alt="Producto 2" /></div>
                    <div><img src={producto3} alt="Producto 3" /></div>
                </Slider>
            </div>
        </div>

    </div>
);
};

export default Header;