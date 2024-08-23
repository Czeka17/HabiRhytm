import React from 'react';
import classes from './HabitModal.module.css';

interface HabitModalProps {
  children: React.ReactNode;
}
function HabitModal({ children }: HabitModalProps) {
  return (
    <div className={classes.HabitModal}>
      <div className={classes.backdrop}></div>
      <div className={classes.HabitModalContent}>{children}</div>
    </div>
  );
}

export default HabitModal;
