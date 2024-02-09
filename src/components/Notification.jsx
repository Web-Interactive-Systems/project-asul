import { Flex } from '@radix-ui/themes';
import styles from './Notification.module.css';

export default function Notification() {
  return (
    <div className={styles.notification}>
      <h2>test notif</h2>
      <p>test notif content</p>
    </div>
  );
}
