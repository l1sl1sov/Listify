import { toast } from 'react-toastify'

export const validateNewTask = () => {}

export const toastError = (error: string) => {
  toast.error(`${error} error, please try later`)
}

export const getHighlighted = (highlight: string, text: string) => {
  if (!highlight || !highlight.trim()) {
    return [{ text, ifHighlighted: false }]
  }

  const regEx = new RegExp(`(${highlight})`, 'gi') //оборачиваем в скобки чтобы при последующем split не пропадало highlight из массива
  const partsOfText = text.split(regEx)
  return partsOfText
    .filter((part) => part !== '')
    .map((part) => ({
      text: part,
      ifHighlighted: part.toLowerCase() === highlight.toLowerCase() //отвечает за дальнейшее отображение стилей если true то это выделенный текст
    }))
}

// console.log(getHighlighted('pri', 'z||&&&__+_dprivetuliki'))