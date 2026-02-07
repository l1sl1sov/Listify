import ReactDOM from 'react-dom'

interface ModalProps {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/15 flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className="flex flex-col p-2 bg-main-1 rounded-lg shadow-lg max-w-[90%] w-[30rem] max-h-[90vh] overflow-y-auto animate-[modalFadeIn_0.3s_ease-out]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-white px-2 flex justify-end w-full items-center rounded-t">
          <button
            className="border-none text-2xl cursor-pointer text-red hover:scale-110 transition-all duration-250 ease-in-out font-semibold"
            onClick={onClose}
            title="close modal"
          >
            x
          </button>
        </div>
        <div className="bg-white text-black px-4 pb-4 [&>*]:text-black">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
