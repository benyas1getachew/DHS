import { FunctionComponent } from "react";
import styles from "./SummerCollection.module.css";

export type SummerCollectionType = {
  className?: string;
};

const SummerCollection: FunctionComponent<SummerCollectionType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.summerCollection, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.ourCuratedSummerCollectionParent}>
          <h2 className={styles.ourCuratedSummer}>
            Our Curated Summer Collection
          </h2>
          <div className={styles.exploreOurCurated}>
            Explore our curated summer collection featuring trending styles,
            vibrant colors and lightweight fabrics perfect for long days and
            nights.
          </div>
        </div>
        <button className={styles.exploreButton}>
          <div className={styles.exploreNow}>Explore Now</div>
        </button>
        <div className={styles.imageCarousel}>
          <img
            className={styles.tableTopViewAccessoryOfClIcon}
            alt=""
            src="/131764372tabletopviewaccessoryofclothingwomenmenplantotravelinsummerholidaybackgroundconcept-1@2x.png"
          />
          <div className={styles.carouselDots} />
          <div className={styles.carouselDots1} />
          <div className={styles.activeDot} />
          <div className={styles.carouselDots2} />
          <div className={styles.carouselDots3} />
          <div className={styles.carouselDots4} />
          <div className={styles.carouselDots5} />
          <div className={styles.carouselDots6} />
          <div className={styles.carouselDots7} />
        </div>
      </div>
    </section>
  );
};

export default SummerCollection;
