import React from 'react';
interface HabitModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
function HabitModal({ children, onClose }: HabitModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-modal-open">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="
        p-4 
        rounded-lg 
        shadow-lg 
        transition-all 
        duration-300 
        ease-in-out 
        transform 
        w-auto 
        max-w-3xl 
        max-h-[90vh] 
        overflow-auto
        animate-modal-show
      "
        style={{ backgroundColor: `var(--bg-color)` }}
      >
        {children}
      </div>
    </div>
  );
}

export default HabitModal;
