import styles from './Modal.module.scss';
import ReactDOM from "react-dom";

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {

    if ( !isOpen ) return null

    return ReactDOM.createPortal(
        <div className={styles['modal-overlay']} onClick={onClose}>
          <div
          className={styles['modal-content']}
          onClick={(event) => event.stopPropagation()}>
            <div className={styles['top-block']}>
                <button
                className={styles['modal-close']}
                onClick={onClose}
                title='close modal'>
                    x
                </button>
            </div>
            <div className={styles.children}>
                {children}
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")!
      );
}