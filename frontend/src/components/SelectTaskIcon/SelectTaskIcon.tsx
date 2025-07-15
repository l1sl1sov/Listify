import styles from './SelectTaskIcon.module.scss';
import { useState } from 'react';
import { ICONS } from '../../constants/tasks';

interface SelectTaskIconProps {
    setIcon?: (iconName: string) => void;
}

const SelectTaskIcon = ({ setIcon }: SelectTaskIconProps) => {

    const [isSelectingIcon, setIsSelectingIcon] = useState(false);

    return (
        <div>
        <button type='button' onClick={() => setIsSelectingIcon(prev => !prev)}>Select icon</button>
        {isSelectingIcon && (
            <div className={styles.grid}>
                {ICONS.map(icon => (
                    <button type='button' onClick={() => {
                        if (setIcon) {
                            setIcon(icon.name);
                        }
                    }}>
                        <img src={`/images/task-icons/${icon.path}`}/>
                    </button>
                ))}
            </div>
        )}
        </div>
    )
}

export default SelectTaskIcon