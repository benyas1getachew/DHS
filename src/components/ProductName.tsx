import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./ProductName.module.css";

export type ProductNameType = {
  className?: string;
  women?: string;
  kRating?: string;
  frenchKissBag?: string;
  aLDO?: string;
  priceLabel?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propBorder?: CSSProperties["border"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propMinWidth?: CSSProperties["minWidth"];
  propMinWidth1?: CSSProperties["minWidth"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const ProductName: FunctionComponent<ProductNameType> = ({
  className = "",
  propWidth,
  propBorder,
  propBackgroundColor,
  women,
  propMinWidth,
  kRating,
  propMinWidth1,
  frenchKissBag,
  propAlignSelf,
  aLDO,
  priceLabel,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      border: propBorder,
      backgroundColor: propBackgroundColor,
    };
  }, [propWidth, propBorder, propBackgroundColor]);

  const womenStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const kRatingStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const frenchKissBagStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
    };
  }, [propAlignSelf]);

  return (
    <div className={[styles.productName, className].join(" ")}>
      <div className={styles.nameWrapper}>
        <div className={styles.womenWrapper} style={frameDivStyle}>
          <div className={styles.women} style={womenStyle}>
            {women}
          </div>
        </div>
        <div className={styles.rating}>
          <div className={styles.starIconParent}>
            <img className={styles.starIcon} alt="" src="/star-icon.svg" />
            <div className={styles.kRating} style={kRatingStyle}>
              {kRating}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productAction}>
        <div className={styles.frenchKissBagParent}>
          <div className={styles.frenchKissBag} style={frenchKissBagStyle}>
            {frenchKissBag}
          </div>
          <div className={styles.aldo}>{aLDO}</div>
        </div>
        <div className={styles.addToCart}>
          <div className={styles.priceWrapper}>
            <div className={styles.priceLabel}>{priceLabel}</div>
          </div>
          <button className={styles.addToCartWrapper}>
            <div className={styles.addToCart1}>Add to cart</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductName;
