import { useLocation, Link } from "react-router-dom";
import styles from './Header.module.scss';

interface HeaderProps {
    textColor?: string;
    links: Array<string>;
    children: React.ReactNode;
}

//this is template for authheader and guestheader

export default function Header({ textColor = 'black', links, children }: HeaderProps) {

    const location = useLocation();

    const isActiveLink = (link: string) => {
        return location.pathname === `/${link}`;
    }

  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
            <ul className={styles.nav_list}
                style={{ '--header-text-color': textColor } as React.CSSProperties}>
                <li>
                    <Link to='/home' className={styles.logo}>
                        <div className={styles.circle}></div>
                        <span className={styles.logo_title}>to do</span>
                    </Link>
                </li>
                <li className={styles.links}>
                    {links.map((link, i) => (
                        <Link to={`/${link}`}
                        className={`${ styles.link } ${ isActiveLink(link) ? styles.active : ''}`}
                        key={i}>
                            {link}
                        </Link>
                    ))}
                </li>
                <li className={styles.buttons}>
                    { children }
                </li>
            </ul>
        </nav>
    </header>
  )
}
