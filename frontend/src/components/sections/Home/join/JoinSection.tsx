import { Reveal } from '../../../Reveal';
import styles from './JoinSection.module.scss';
import { Link } from 'react-router-dom';

export const JoinSection = () => {
    return (
        <section className={styles['join-section']}>
            <div className={styles['join-bg']}>
                <Reveal delay={0.75}><div className={styles['join-text']}>
                    <h2>join our</h2>
                    <h2>community</h2>
                </div></Reveal>
                <Reveal delay={0.9}><button className={styles['join-button']}>
                    <Link to='/tasks'>
                        join us
                </Link>
                </button></Reveal>
            </div>
        </section>
    )
}