import React from 'react';
import classes from './HabitModal.module.css';

interface HabitModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
function HabitModal({ children, onClose }: HabitModalProps) {
  return (
    <div className={classes.HabitModal}>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.HabitModalContent}>{children}</div>
    </div>
  );
}

export default HabitModal;
