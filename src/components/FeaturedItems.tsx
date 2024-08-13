import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./FeaturedItems.module.css";

export type FeaturedItemsType = {
  className?: string;
  images1?: string;
  shoes?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propWidth?: CSSProperties["width"];
};

const FeaturedItems: FunctionComponent<FeaturedItemsType> = ({
  className = "",
  images1,
  propHeight,
  propWidth,
  shoes,
}) => {
  const images1IconStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      width: propWidth,
    };
  }, [propHeight, propWidth]);

  return (
    <div className={[styles.featuredItems, className].join(" ")}>
      <div className={styles.featuredContent}>
        <img
          className={styles.images1Icon}
          loading="lazy"
          alt=""
          src={images1}
          style={images1IconStyle}
        />
      </div>
      <div className={styles.shoesParent}>
        <div className={styles.shoes}>{shoes}</div>
        <div className={styles.seeAllCollections}>See all collections</div>
      </div>
    </div>
  );
};

export default FeaturedItems;
