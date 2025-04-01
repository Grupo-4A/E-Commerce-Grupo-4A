import styles from './Shortcut.module.css';
import Hardware from '../../assets/btnHar.jpg';
import Software from '../../assets/btnSof.jpg';
import Plantillas from '../../assets/btnPlan.jpg';

const Shortcut = () => {
    return (
        <div className={styles.shortcutContainer}>
            <div className={styles.btnShortcut}>
                <button className={styles.button}>
                    <div className={styles.textContainer}>
                        <h4>Software</h4>
                        <p>Herramientas para desarroladores y diseñadores</p>
                    </div>
                    <img src={Software} alt="Software" />
                </button>
                <button className={styles.button}>
                    <div className={styles.textContainer}>
                        <h4>Plantillas Frontend</h4>
                        <p>Listas para usar y personalizar</p>
                    </div>
                    <img src={Plantillas} alt="Plantillas" />
                </button>
                <button className={styles.button}>
                    <div className={styles.textContainer}>
                        <h4>Hardware</h4>
                        <p>Componentes y dispositivos de alta calidad</p>
                    </div>
                    <img src={Hardware} alt="Hardware" />
                </button>
            </div>
        </div>
    );
};

export default Shortcut;
