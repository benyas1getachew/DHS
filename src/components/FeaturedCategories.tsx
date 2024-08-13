import { FunctionComponent } from "react";
import FeaturedItems from "./FeaturedItems";
import FeaturedItems1 from "./FeaturedItems1";
import FrameComponent4 from "./FrameComponent4";
import styles from "./FeaturedCategories.module.css";

export type FeaturedCategoriesType = {
  className?: string;
};

const FeaturedCategories: FunctionComponent<FeaturedCategoriesType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.featuredCategories, className].join(" ")}>
      <div className={styles.featuredGrid}>
        <FeaturedItems images1="/images-1@2x.png" shoes="Shoes" />
        <div className={styles.featuredItems}>
          <div className={styles.frameParent}>
            <img
              className={styles.frameChild}
              loading="lazy"
              alt=""
              src="/frame-47@2x.png"
            />
            <div className={styles.categories}>
              <div className={styles.bags}>Bags</div>
              <div className={styles.seeAllCollections}>
                See all collections
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featuredItems1}>
          <div className={styles.ghostMannequinBeigeWomensPWrapper}>
            <img
              className={styles.ghostMannequinBeigeWomensPIcon}
              loading="lazy"
              alt=""
              src="/ghostmannequinbeigewomenspuffer600nw2482912771-2@2x.png"
            />
          </div>
          <div className={styles.jacketsParent}>
            <div className={styles.bags}>Jackets</div>
            <div className={styles.seeAllCollections}>See all collections</div>
          </div>
        </div>
        <div className={styles.featuredItems1}>
          <div className={styles.ghostMannequinBeigeWomensPWrapper}>
            <img
              className={styles.images3Icon}
              loading="lazy"
              alt=""
              src="/images-3@2x.png"
            />
          </div>
          <div className={styles.jacketsParent}>
            <div className={styles.bags}>Lingerie</div>
            <div className={styles.seeAllCollections}>See all collections</div>
          </div>
        </div>
        <FeaturedItems
          images1="/download-1@2x.png"
          propHeight="calc(100% - 15px)"
          propWidth="85px"
          shoes="Belts"
        />
        <div className={styles.featuredItems1}>
          <div className={styles.ghostMannequinBeigeWomensPWrapper}>
            <img
              className={styles.images4Icon}
              loading="lazy"
              alt=""
              src="/images-4@2x.png"
            />
          </div>
          <div className={styles.jacketsParent}>
            <div className={styles.bags}>Street wear</div>
            <div className={styles.seeAllCollections}>See all collections</div>
          </div>
        </div>
        <FeaturedItems1
          personalizedBigSizeHumanHead="/personalizedbigsizehumanheadsunglassesinstagramoversizefashionpinktypepcsunglasseswomenmen-1@2x.png"
          sunglasses="Sunglasses"
        />
        <FeaturedItems1
          personalizedBigSizeHumanHead="/f939e1d985aa4bd8bf430dd73ef4001b9ad3eb73ad803c9733563382957d42c3-1@2x.png"
          sunglasses="Sun wear"
        />
        <div className={styles.featuredItems4}>
          <div className={styles.frameGroup}>
            <div className={styles.pngtreeWomenHatPngImage52Wrapper}>
              <img
                className={styles.pngtreeWomenHatPngImage52Icon}
                loading="lazy"
                alt=""
                src="/pngtreewomenhatpngimage-521498-1@2x.png"
              />
            </div>
            <div className={styles.hatsParent}>
              <div className={styles.bags}>Hats</div>
              <div className={styles.seeAllCollections}>
                See all collections
              </div>
            </div>
          </div>
        </div>
        <FeaturedItems1
          personalizedBigSizeHumanHead="/ftw1239womensstripedslippers1450x450-1@2x.png"
          sunglasses="Slippers"
        />
        <div className={styles.featuredItems4}>
          <div className={styles.frameGroup}>
            <div className={styles.pngtreeWomenHatPngImage52Wrapper}>
              <img
                className={styles.wigs1Icon}
                loading="lazy"
                alt=""
                src="/wigs-1@2x.png"
              />
            </div>
            <div className={styles.hatsParent}>
              <div className={styles.bags}>Wigs</div>
              <div className={styles.seeAllCollections}>
                See all collections
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featuredItems4}>
          <div className={styles.frameDiv}>
            <div className={styles.frameWrapper}>
              <div className={styles.nmtoe2KlSl1500838011Wrapper}>
                <img
                  className={styles.nmtoe2KlSl1500838011Icon}
                  loading="lazy"
                  alt=""
                  src="/61nmtoe2-kl-sl1500---83801-1@2x.png"
                />
              </div>
            </div>
            <div className={styles.bags}>Cosmetics</div>
            <div className={styles.seeAllCollections}>See all collections</div>
          </div>
        </div>
      </div>
      <div className={styles.moreCategories}>
        <FrameComponent4 />
      </div>
    </div>
  );
};

export default FeaturedCategories;
