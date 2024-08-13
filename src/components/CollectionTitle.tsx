import { FunctionComponent } from "react";
import styles from "./CollectionTitle.module.css";

export type CollectionTitleType = {
  className?: string;
  latestCollections?: string;
  group225?: string;
};

const CollectionTitle: FunctionComponent<CollectionTitleType> = ({
  className = "",
  latestCollections,
  group225,
}) => {
  return (
    <div className={[styles.collectionTitle, className].join(" ")}>
      <h2 className={styles.latestCollections}>{latestCollections}</h2>
      <div className={styles.viewAll}>
        <img
          className={styles.viewAllChild}
          loading="lazy"
          alt=""
          src={group225}
        />
      </div>
    </div>
  );
};

export default CollectionTitle;
