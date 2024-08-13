import { FunctionComponent } from "react";
import styles from "./FrameComponent3.module.css";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: FunctionComponent<FrameComponent3Type> = ({
  className = "",
}) => {
  return (
    <section className={[styles.passwordInputWrapper, className].join(" ")}>
      <div className={styles.passwordInput}>
        <div className={styles.passwordInputChild} />
        <div className={styles.bannerDivider} />
        <div className={styles.bannerTitleWrapper}>
          <div className={styles.bannerTitle}>
            <div className={styles.titleWrapper}>
              <div className={styles.timbuParent}>
                <h1 className={styles.timbu}>TIMBU</h1>
                <div className={styles.brandIcon}>
                  <img
                    className={styles.brandIconChild}
                    loading="lazy"
                    alt=""
                    src="/ellipse-5@2x.png"
                  />
                </div>
              </div>
            </div>
            <div className={styles.bannerDescription}>
              <div className={styles.descriptionWrapper}>
                <div className={styles.descriptionIconWrapper}>
                  <img
                    className={styles.descriptionIcon}
                    loading="lazy"
                    alt=""
                    src="/ellipse-3@2x.png"
                  />
                </div>
                <button className={styles.shopNowButton}>
                  <div className={styles.exploreNow}>Explore Now</div>
                </button>
              </div>
              <div className={styles.buttonWrapper}>
                <div className={styles.shopLinkParent}>
                  <div className={styles.shopLink}>
                    <div className={styles.discoverAWorld}>
                      Discover a world of convenience with our user-friendly
                      platform, curaated collections, and exceptional customer
                      service
                    </div>
                    <div className={styles.shopWrapper}>
                      <h1 className={styles.shop}>SHOP</h1>
                    </div>
                  </div>
                  <div className={styles.buttonIcon}>
                    <img
                      className={styles.buttonIconChild}
                      loading="lazy"
                      alt=""
                      src="/ellipse-4@2x.png"
                    />
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

export default FrameComponent3;
