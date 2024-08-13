import { FunctionComponent } from "react";
import styles from "./FrameComponent2.module.css";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
}) => {
  return (
    <header className={[styles.homePageInner, className].join(" ")}>
      <div className={styles.icons4741611Parent}>
        <img
          className={styles.icons4741611}
          loading="lazy"
          alt=""
          src="/icons-474161-1.svg"
        />
        <div className={styles.registerHere}>
          <div className={styles.saly}>
            <img className={styles.bxsuserIcon} alt="" src="/bxsuser.svg" />
            <a className={styles.registersignIn}>Register/Sign In</a>
            <img
              className={styles.bxsuserIcon}
              alt=""
              src="/arrowdown01sharp.svg"
            />
          </div>
          <a className={styles.home}>Home</a>
          <div className={styles.men}>Men</div>
          <a className={styles.women}>Women</a>
          <a className={styles.kids}>Kids</a>
          <a className={styles.accessories}>Accessories</a>
          <div className={styles.saly}>
            <a className={styles.more}>More</a>
            <img
              className={styles.bxsuserIcon}
              alt=""
              src="/arrowdown01sharp.svg"
            />
          </div>
        </div>
        <div className={styles.searchBarParent}>
          <div className={styles.searchBar}>
            <img className={styles.bxsuserIcon} alt="" src="/search.svg" />
            <a className={styles.search}>Search</a>
          </div>
          <div className={styles.searchFilter}>
            <div className={styles.filterDropdown}>
              <img
                className={styles.carbonsearchIcon}
                loading="lazy"
                alt=""
                src="/carbonsearch.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.saly}>
          <img
            className={styles.unitedKingdomIcon}
            alt=""
            src="/united-kingdom.svg"
          />
          <a className={styles.encurrency}>EN/Currency</a>
          <img
            className={styles.bxsuserIcon}
            alt=""
            src="/arrowdown01sharp.svg"
          />
        </div>
        <div className={styles.frameParent}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/frame-24.svg"
          />
          <div className={styles.avatarBackgroundParent}>
            <div className={styles.avatarBackground} />
            <a className={styles.avatarInitial}>2</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrameComponent2;
