import React from 'react'
import classNames from 'classnames'
import styles from './style.css'
const Loader = ({ spinning = true, fullScreen }) => {
    return (
        <div
            className={classNames(styles.loader, {
                [styles.hidden]: !spinning,
                [styles.fullScreen]: fullScreen,
            })}
        />
    )
}

export default Loader
