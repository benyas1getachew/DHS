import { FunctionComponent } from "react";
import CollectionTitle from "./CollectionTitle";
import ProductName from "./ProductName";
import styles from "./Collections.module.css";

export type CollectionsType = {
  className?: string;
};

const Collections: FunctionComponent<CollectionsType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.collections, className].join(" ")}>
      <div className={styles.collectionHeader}>
        <CollectionTitle
          latestCollections="Latest Collections"
          group225="/group-225.svg"
        />
        <div className={styles.loginForm}>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.productWrapperParent}>
              <img
                className={styles.productWrapperIcon}
                loading="lazy"
                alt=""
                src="/frame-29.svg"
              />
              <img
                className={styles.d69120edd5c8b1e2c140e4dc7f254eIcon}
                loading="lazy"
                alt=""
                src="/03d69120edd5c8b1e2c140e4dc7f254e-2@2x.png"
              />
              <div className={styles.productDetails}>
                <div className={styles.stockStatus}>
                  <div className={styles.inStock}>In Stock</div>
                </div>
              </div>
            </div>
            <ProductName
              women="Women"
              kRating="2k+ rating"
              frenchKissBag="French Kiss Bag"
              aLDO="ALDO"
              priceLabel="$500"
            />
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.frameParent}>
              <img
                className={styles.productWrapperIcon}
                alt=""
                src="/frame-29.svg"
              />
              <div className={styles.oejshhpylSy6252Wrapper}>
                <img
                  className={styles.oejshhpylSy6252Icon}
                  loading="lazy"
                  alt=""
                  src="/61oejshhpyl-sy625--2@2x.png"
                />
              </div>
              <div className={styles.stockStatus}>
                <div className={styles.inStock}>In Stock</div>
              </div>
            </div>
            <ProductName
              propWidth="47px"
              propBorder="1px solid #b1b1b1"
              propBackgroundColor="#fff"
              women="Kids"
              propMinWidth="25px"
              kRating="1k+ rating"
              propMinWidth1="77px"
              frenchKissBag="Burberry shine"
              propAlignSelf="stretch"
              aLDO="FENDI"
              priceLabel="$150"
            />
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.frameGroup}>
              <img
                className={styles.productWrapperIcon}
                alt=""
                src="/frame-29.svg"
              />
              <div className={styles.brown92Wrapper}>
                <img
                  className={styles.brown92Icon}
                  loading="lazy"
                  alt=""
                  src="/150577-brown-9-2@2x.png"
                />
              </div>
              <div className={styles.stockStatus}>
                <div className={styles.inStock}>In Stock</div>
              </div>
            </div>
            <div className={styles.frameContainer}>
              <div className={styles.frameDiv}>
                <div className={styles.womenWrapper}>
                  <div className={styles.inStock}>Women</div>
                </div>
                <div className={styles.frameWrapper}>
                  <div className={styles.starParent}>
                    <img
                      className={styles.starIcon}
                      alt=""
                      src="/star-icon.svg"
                    />
                    <div className={styles.kRating}>5K+ rating</div>
                  </div>
                </div>
              </div>
              <div className={styles.alveroGownParent}>
                <div className={styles.alveroGown}>Alvero Gown</div>
                <div className={styles.divineParent}>
                  <div className={styles.divine}>DIVINE</div>
                  <div className={styles.frameParent1}>
                    <div className={styles.cartIconWrapper}>
                      <div className={styles.cartIcon}>$300</div>
                    </div>
                    <button className={styles.cartButtonWrapper}>
                      <div className={styles.addToCart}>Add to cart</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
