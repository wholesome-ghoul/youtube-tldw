import styles from "./InProgress.module.css";

const InProgress = () => {
  return (
    <div className={styles.loadingDotsContainer}>
      <p>This gonna take a while.</p>
      <p className={styles.loadingDots}>Loading</p>
    </div>
  );
};

export default InProgress;
