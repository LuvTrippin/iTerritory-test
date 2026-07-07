import { Outlet, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.headerLogo}>iTerritory Test</div>
                    <nav className={styles.nav}>
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''}>Главная</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : ''}>О нас</NavLink>
                        <a href="#gallery">Галерея</a>
                        <a href="#contacts">Контакты</a>
                    </nav>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </main>

            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div id="contacts" className={styles.contacts}>
                        <a href="tel:+71234567890">+7 (123) 456-78-90</a>
                        <a href="mailto:ITSergeev.CY@yandex.ru">ITSergeev.CY@yandex.ru</a>
                        <a href="https://github.com/LuvTrippin/iTerritory-test" target="_blank" rel="noopener noreferrer">GitHub проекта</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Layout;