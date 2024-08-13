import { FunctionComponent } from "react";
import styles from "./SocialFooter.module.css";

export type SocialFooterType = {
  className?: string;
};

const SocialFooter: FunctionComponent<SocialFooterType> = ({
  className = "",
}) => {
  return (
    <footer className={[styles.socialFooter, className].join(" ")}>
      <div className={styles.icons4741612Parent}>
        <img
          className={styles.icons4741612}
          loading="lazy"
          alt=""
          src="/icons-474161-2.svg"
        />
        <div className={styles.socialLinks}>
          <div className={styles.socialPlatform}>
            <img
              className={styles.antDesigninstagramOutlinedIcon}
              loading="lazy"
              alt=""
              src="/antdesigninstagramoutlined.svg"
            />
            <img
              className={styles.antDesigninstagramOutlinedIcon}
              loading="lazy"
              alt=""
              src="/riwhatsappline.svg"
            />
            <img
              className={styles.antDesigninstagramOutlinedIcon}
              loading="lazy"
              alt=""
              src="/iconoirx.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.footerLinks}>
        <div className={styles.footerNavigation}>
          <div className={styles.linkColumns}>
            <b className={styles.about}>About</b>
            <div className={styles.aboutUs}>About Us</div>
            <div className={styles.newsBlog}>{`News & Blog`}</div>
            <div className={styles.aboutUs}>Location</div>
          </div>
          <div className={styles.linkColumns}>
            <b className={styles.about}>Products</b>
            <div className={styles.aboutUs}>Pricing</div>
            <div className={styles.aboutUs}>Store</div>
            <div className={styles.aboutUs}>Features</div>
          </div>
          <div className={styles.linkColumns}>
            <b className={styles.about}>Discover</b>
            <div className={styles.aboutUs}>Contact Us</div>
            <div className={styles.aboutUs}>Customers</div>
            <div className={styles.aboutUs}>Affiliates</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
