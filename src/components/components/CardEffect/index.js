import React from 'react';
import cn from 'classnames';
import styles from './style.module.scss';

const CardEffect = ({
  text1 = 'Kartın takılı olduğuna emin olun',
  text2 = 'Kart Okunuyor...'
}) => {
  return (
    <div className={styles.paymentloader}>
      <div className={styles.pad}>
        <div className={styles.chip}></div>
        <div className={cn(styles.line, styles.line1)}></div>
        <div className={cn(styles.line, styles.line2)}></div>
      </div>
      <div className={styles.loadertext}>
        <p>{text1}</p>
        <p>{text2}</p>
      </div>
    </div>
  );
};

export default React.memo(CardEffect);
