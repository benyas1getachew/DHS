import { FunctionComponent } from "react";
import CollectionTitle from "./CollectionTitle";
import CategoryItems from "./CategoryItems";
import styles from "./BrowseCategory.module.css";

export type BrowseCategoryType = {
  className?: string;
};

const BrowseCategory: FunctionComponent<BrowseCategoryType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.browseCategory, className].join(" ")}>
      <div className={styles.accountNameParent}>
        <CollectionTitle
          latestCollections="Browse by category"
          group225="/group-225.svg"
        />
        <div className={styles.categoryGrid}>
          <div className={styles.categoryItems}>
            <div className={styles.categoryItem}>
              <img
                className={styles.images5Icon}
                alt=""
                src="/images-5@2x.png"
              />
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemTitle}>
                <div className={styles.casualWear}>Casual wear</div>
                <div className={styles.over20Categories}>
                  Over 20 categories in stock
                </div>
              </div>
            </div>
          </div>
          <CategoryItems
            images6="/images-6@2x.png"
            vintage="Vintage"
            over31CategoriesInStock="Over 31 categories in stock"
          />
          <div className={styles.categoryItems1}>
            <div className={styles.categoryItemsInner}>
              <div className={styles.images7Parent}>
                <img
                  className={styles.images7Icon}
                  alt=""
                  src="/images-7@2x.png"
                />
                <img
                  className={styles.carbonsearchIcon}
                  alt=""
                  src="/carbonsearch.svg"
                />
              </div>
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemTitle}>
                <div className={styles.casualWear}>Beauty products</div>
                <div className={styles.over20Categories}>
                  Over 24 categories in stock
                </div>
              </div>
            </div>
          </div>
          <CategoryItems
            images6="/il-570xn4777554261-6xy6-2@2x.png"
            propTop="41px"
            propHeight="217px"
            vintage="Gym wears"
            over31CategoriesInStock="Over 62 categories in stock"
          />
        </div>
      </div>
    </section>
  );
};

export default BrowseCategory;
