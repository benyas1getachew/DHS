import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./CategoryItems.module.css";

export type CategoryItemsType = {
  className?: string;
  images6?: string;
  vintage?: string;
  over31CategoriesInStock?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
  propHeight?: CSSProperties["height"];
};

const CategoryItems: FunctionComponent<CategoryItemsType> = ({
  className = "",
  images6,
  propTop,
  propHeight,
  vintage,
  over31CategoriesInStock,
}) => {
  const images6IconStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      height: propHeight,
    };
  }, [propTop, propHeight]);

  return (
    <div className={[styles.categoryItems, className].join(" ")}>
      <div className={styles.images6Wrapper}>
        <img
          className={styles.images6Icon}
          loading="lazy"
          alt=""
          src={images6}
          style={images6IconStyle}
        />
      </div>
      <div className={styles.categoryItemsInner}>
        <div className={styles.vintageParent}>
          <div className={styles.vintage}>{vintage}</div>
          <div className={styles.over31Categories}>
            {over31CategoriesInStock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;
