import styles from './MoneySection.module.scss'

export const MoneySection = () => {
  return (
    <section className={styles.grid}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          every task has a <span>value</span>
        </h3>
        <p className={styles['main-text']}>
          Your to-do list is more than just tasks - it's your personal
          wealth-building machine. Each item you check off represents either
          direct income, future earning potential, or cost savings. When you
          complete a client project, you're depositing money in your bank
          account. When you learn a new skill, you're increasing your future
          hourly rate. Even administrative tasks like organizing receipts
          contribute to your financial health by saving you money during tax
          season.
        </p>
      </div>
      <div className={styles['icon-container']}></div>
    </section>
  )
}
