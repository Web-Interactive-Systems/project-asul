import { Flex } from '@radix-ui/themes';
import styles from './Notification.module.css';

export default function Notification({ title }) {
  return (
    <div className={styles.notification}>
      <h5>{title}</h5>
    </div>
  );
}
