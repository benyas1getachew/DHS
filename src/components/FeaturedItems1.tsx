import { FunctionComponent } from "react";
import styles from "./FeaturedItems1.module.css";

export type FeaturedItems1Type = {
  className?: string;
  personalizedBigSizeHumanHead?: string;
  sunglasses?: string;
};

const FeaturedItems1: FunctionComponent<FeaturedItems1Type> = ({
  className = "",
  personalizedBigSizeHumanHead,
  sunglasses,
}) => {
  return (
    <div className={[styles.featuredItems, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.personalizedBigSizeHumanHeWrapper}>
          <img
            className={styles.personalizedBigSizeHumanHeIcon}
            loading="lazy"
            alt=""
            src={personalizedBigSizeHumanHead}
          />
        </div>
        <div className={styles.sunglassesParent}>
          <div className={styles.sunglasses}>{sunglasses}</div>
          <div className={styles.seeAllCollections}>See all collections</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems1;
