import styles from './GrowthSection.module.scss';

export const GrowthSection = () => {
    return (
        <section className={styles.grid}>
            <div className={styles['icon-container']}></div>
            <div className={styles.content}>
                <h3 className={styles.title}>
                    <span>level up</span> with every task
                </h3>
                <p className={styles['main-text']}>
                    Our task completion analytics help you identify productivity patterns. Track your weekly progress with visual charts showing completed vs. pending tasks, average completion time, and peak productivity hours. The system automatically categorizes tasks by difficulty (quick wins, medium effort, deep work) to help you balance your workload.
                </p>
            </div>
        </section>
    )
}