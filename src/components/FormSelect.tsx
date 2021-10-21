import React, { ChangeEvent } from 'react';
import { Options } from '../types/Options';

type Props = {
  options: Options;
  value: any;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const FormSelect: React.FC<Props> = ({ options, ...props }) => {
  return (
    <select {...props} className="px-4 py-2">
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
