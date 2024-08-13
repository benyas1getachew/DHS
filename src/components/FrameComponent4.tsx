import { FunctionComponent } from "react";
import styles from "./FrameComponent4.module.css";

export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: FunctionComponent<FrameComponent4Type> = ({
  className = "",
}) => {
  return (
    <button className={[styles.moreParent, className].join(" ")}>
      <div className={styles.more}>See more</div>
      <div className={styles.moreIcon}>
        <img className={styles.moreIconChild} alt="" src="/group-217.svg" />
      </div>
    </button>
  );
};

export default FrameComponent4;
