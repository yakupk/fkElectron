import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import {
  LeftCircleOutlined
} from '@ant-design/icons';


const NumPad = ({ setFunc, disabled = false }) => (
  <div className={cn(styles.calc_body, disabled && styles.disabled)}>
    <button
      id="btn_reset"
      onClick={() => setFunc("reset")}
      className={styles.btn_reset}
    >
      C
    </button>

    <button
      id="btn_zero"
      onClick={() => setFunc(0)}
      className={styles.btn_zero}
    >
      0
    </button>

    <button
      id="btn_del"
      onClick={() => setFunc("del")}
      className={styles.btn_del}
    >
      <LeftCircleOutlined />
    </button>

    <button id="btn_one" onClick={() => setFunc(1)} className={styles.btn_one}>
      1
    </button>
    <button id="btn_two" onClick={() => setFunc(2)} className={styles.btn_two}>
      2
    </button>
    <button
      id="btn_three"
      onClick={() => setFunc(3)}
      className={styles.btn_three}
    >
      3
    </button>
    <button
      id="btn_four"
      onClick={() => setFunc(4)}
      className={styles.btn_four}
    >
      4
    </button>
    <button
      id="btn_five"
      onClick={() => setFunc(5)}
      className={styles.btn_five}
    >
      5
    </button>
    <button id="btn_six" onClick={() => setFunc(6)} className={styles.btn_six}>
      6
    </button>
    <button
      id="btn_seven"
      onClick={() => setFunc(7)}
      className={styles.btn_seven}
    >
      7
    </button>
    <button
      id="btn_eight"
      onClick={() => setFunc(8)}
      className={styles.btn_eight}
    >
      8
    </button>
    <button
      id="btn_nine"
      onClick={() => setFunc(9)}
      className={styles.btn_nine}
    >
      9
    </button>
  </div>
);

NumPad.propTypes = {
  setFunc: PropTypes.func,
};

export default NumPad;
