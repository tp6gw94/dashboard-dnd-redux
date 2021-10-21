import React from 'react';
import { Options } from '../types/Options';
import { useField } from 'formik';

type Props = {
  name: string;
  options: Options;
  value: any;
};

const SelectField: React.FC<Props> = ({ value, name, options }) => {
  const [field] = useField({ name, value });

  return (
    <select {...field} className="px-4 py-2">
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
