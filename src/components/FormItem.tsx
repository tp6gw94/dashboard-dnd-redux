import React from 'react';

const FormItem: React.FC = ({ children }) => {
  return <div className="flex items-center space-x-1">{children}</div>;
};

export default FormItem;
