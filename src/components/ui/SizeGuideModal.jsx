// src/components/ui/SizeGuideModal.jsx
import React from 'react';

const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl z-50 shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-borderLight">
          <h3 className="font-heading text-xl font-medium text-primary">Size Guide</h3>
          <button onClick={onClose} className="text-textMedium hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-medium text-textDark mb-3">Ring Sizing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-textMedium">US Size</span>
                  <span className="text-textMedium">Circumference (mm)</span>
                </div>
                {[
                  { size: 'S (5-6)', circ: '49.3 - 51.9' },
                  { size: 'M (7-8)', circ: '54.4 - 57.0' },
                  { size: 'L (9-10)', circ: '59.5 - 62.1' },
                ].map(item => (
                  <div key={item.size} className="flex justify-between border-b border-borderLight py-2">
                    <span className="text-textDark">{item.size}</span>
                    <span className="text-textMedium">{item.circ} mm</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-textMedium text-xs leading-relaxed">
                <span className="font-medium text-textDark">Tip:</span> For best fit, measure your finger at the end of the day when it's largest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeGuideModal;