import logo from '../assets/note-logo.png';
import Avatar from '../assets/avatar.png';
import styles from './Navbar.module.css';

const Navbar = () => {
  return <div className={styles.navbar}>
    <a href={'/'} className={styles.logo}>
      <img src={logo} alt="logo" />
      <div className={styles.logoTitle}>
        Note-IT <span> App</span>

      </div>
    </a>
    <div className={styles.avatar}>
      <img src={Avatar} alt="Avatar" />
    </div>
  </div>;
};

export default Navbar;
