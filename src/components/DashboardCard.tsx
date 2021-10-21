import React, { ReactElement } from 'react';

type Props = {
  form: ReactElement;
  chart: ReactElement;
};

const DashboardCard: React.FC<Props> = ({ form, chart }) => {
  return (
    <div
      className="flex items-center justify-between w-full overflow-hidden"
      style={{ minHeight: '500px' }}
    >
      <div className="flex flex-col w-full items-start justify-between rounded bg-white shadow">
        <div
          className="w-full  h-full flex-grow dark:bg-gray-800"
          style={{ minHeight: '300px' }}
        >
          {chart}
        </div>
        <div className="w-full flex items-center max-h-16 h-full bg-gray-100 text-gray-600 p-2 text-sm space-y-1">
          {form}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
