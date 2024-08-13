import { FunctionComponent } from "react";
import styles from "./FrameComponent1.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
}) => {
  return (
    <div className={[styles.categoryItemsWrapper, className].join(" ")}>
      <div className={styles.categoryItems}>
        <div className={styles.categoryLinks}>
          <div className={styles.men}>Men</div>
        </div>
        <button className={styles.categoryLinks1}>
          <div className={styles.women}>Women</div>
        </button>
        <div className={styles.categoryLinks2}>
          <div className={styles.kids}>Kids</div>
        </div>
        <div className={styles.categoryLinks3}>
          <div className={styles.perfumes}>Perfumes</div>
        </div>
        <div className={styles.categoryLinks4}>
          <div className={styles.sport}>Sport</div>
        </div>
        <div className={styles.categoryLinks5}>
          <div className={styles.jewelry}>Jewelry</div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
