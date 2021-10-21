import React, { useState } from 'react';
import { Options } from '../types/Options';
import classnames from 'classnames';

type Props = {
  options: Options;
  value?: any;
  onUpdateVal: (val: any) => void;
  placeholder?: string;
  disable?: boolean;
};

const Dropdown: React.FC<Props> = ({
  value,
  options,
  placeholder,
  onUpdateVal,
  disable = false,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const currentLabel =
    options?.find(({ value: optionValue }) => optionValue === value)?.label ||
    placeholder ||
    'Please Select';
  const onSelectedVal = (val: string) => {
    onUpdateVal(val);
    setIsShow(false);
  };

  return (
    <>
      {/* click background hide options */}
      {isShow && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0"
          onClick={() => setIsShow(false)}
        />
      )}
      {/* dropdown */}
      <div className="flex">
        <div className="relative">
          <div
            className={classnames(
              'bg-white flex items-center justify-between border rounded border-gray-300 w-40 cursor-pointer',
              {
                'bg-white': !disable,
                'bg-gray-400 cursor-not-allowed': disable,
              }
            )}
            onClick={() => !disable && setIsShow(!isShow)}
          >
            <p
              className={classnames(
                'pl-3 py-3 text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal font-normal',
                { 'cursor-not-allowed': disable }
              )}
            >
              {currentLabel}
            </p>
            <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
              <i className={isShow ? 'gg-chevron-up' : 'gg-chevron-down'} />
            </div>
          </div>
          {isShow && (
            <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mt-2 w-48 py-1 absolute z-10">
              {options.map(({ value: optionValue, label }) => (
                <li
                  key={value}
                  onClick={() => {
                    onSelectedVal(optionValue);
                  }}
                  className={classnames(
                    'cursor-pointer text-sm leading-3 tracking-normal py-3 px-3 font-normal select-none',
                    {
                      'bg-blue-400 text-white': value === optionValue,
                      'hover:bg-gray-100 text-gray-600': value !== optionValue,
                    }
                  )}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
