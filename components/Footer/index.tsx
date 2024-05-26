import styles from './index.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.cr}>© 2020-{new Date().getFullYear()} BlogBooks Community. All Rights Reserved.</p>
    </footer>
  );
}
