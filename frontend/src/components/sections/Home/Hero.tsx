import styles from './Hero.module.scss';

export default function Hero() {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <div className={styles.title}>
                        <h1>the best way to</h1>
                        <h1><span>organize</span> your day</h1>
                    </div>
                    <div className={styles.main_text}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                    </div>
                </div>
            </div>
        </div>
    )
}