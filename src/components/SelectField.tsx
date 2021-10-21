import React, { useEffect } from 'react';
import { Options } from '../types/Options';
import { useField } from 'formik';

type Props = {
  name: string;
  options: Options;
  value: any;
};

const SelectField: React.FC<Props> = ({ value, name, options }) => {
  const [field, , { setValue }] = useField({ name, value });

  useEffect(() => {
    if (!options.find((option) => option.value === value)) {
      setValue(options[0].value);
    }
  }, [options, setValue, value]);

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
