import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  value: number
  message: string
}

const ProgressBar = ({ value, message }: ProgressBarProps) => {
  const status = value < 30 ? 'bad' : value < 70 ? 'medium' : 'good'

  return (
    <label className='flex w-1/2 items-center'>
      <span className='w-1/2'>{message}</span>
      <progress max="100" value={value} className={styles[status]}></progress>
    </label>
  )
}

export default ProgressBar
