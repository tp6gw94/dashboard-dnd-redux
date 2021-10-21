import React from 'react';
import { Line } from 'react-chartjs-2';

type Props = {
  datasets: Array<number>;
  labels: Array<string>;
  datasetName: string;
};

const LineChart: React.FC<Props> = ({ datasets, labels, datasetName }) => {
  return (
    <div className="w-full max-w-2xl mx-auto relative h-full">
      {datasets.length ? (
        <Line
          data={{ labels, datasets: [{ data: datasets, label: datasetName }] }}
        />
      ) : (
        'no data'
      )}
    </div>
  );
};

export default LineChart;
