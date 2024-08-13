import { FunctionComponent } from "react";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent3 from "../components/FrameComponent3";
import Collections from "../components/Collections";
import FrameComponent1 from "../components/FrameComponent1";
import FeaturedCategories from "../components/FeaturedCategories";
import SummerCollection from "../components/SummerCollection";
import BrowseCategory from "../components/BrowseCategory";
import SocialFooter from "../components/SocialFooter";
import styles from "./HomePage.module.css";

const HomePage: FunctionComponent = () => {
  return (
    <div className={styles.homePage}>
      <FrameComponent2 />
      <FrameComponent3 />
      <Collections />
      <section className={styles.categoryNavigation}>
        <div className={styles.categoryList}>
          <FrameComponent1 />
          <FeaturedCategories />
        </div>
      </section>
      <SummerCollection />
      <BrowseCategory />
      <SocialFooter />
    </div>
  );
};

export default HomePage;
