import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  value: number
  message: string
}

const ProgressBar = ({ value, message }: ProgressBarProps) => {
  const status = value < 30 ? 'bad' : value < 70 ? 'medium' : 'good'

  return (
    <label className={styles.label}>
      <span>{message}</span>
      <progress max="100" value={value} className={styles[status]}></progress>
    </label>
  )
}

export default ProgressBar
