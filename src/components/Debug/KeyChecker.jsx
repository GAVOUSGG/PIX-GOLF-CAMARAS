import React from 'react';

const KeyChecker = ({ data, componentName }) => {
  const duplicates = data.filter((item, index) => 
    data.findIndex(i => i.id === item.id) !== index
  );

  if (duplicates.length > 0) {
    console.warn(`⚠️ Duplicate IDs in ${componentName}:`, duplicates);
  }

  const missingIds = data.filter(item => !item.id);
  if (missingIds.length > 0) {
    console.warn(`⚠️ Missing IDs in ${componentName}:`, missingIds);
  }

  return null;
};

export default KeyChecker;