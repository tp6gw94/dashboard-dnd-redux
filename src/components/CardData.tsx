import React from 'react';
import { CwbDisplayType } from '../consts/cwbDisplayType';
import LineChart from './LineChart';
import RawData from './RawData';

type Props = {
  datasets?: Array<number>;
  labels?: Array<string>;
  datasetName?: string;
  data?: string;
  displayType: CwbDisplayType;
};

const CardData: React.FC<Props> = ({
  displayType,
  data,
  datasets,
  datasetName,
  labels,
}) => {
  if (displayType === CwbDisplayType.Line && datasets && labels && datasetName)
    return (
      <LineChart
        datasets={datasets}
        labels={labels}
        datasetName={datasetName}
      />
    );
  if (displayType === CwbDisplayType.RawData && data)
    return <RawData data={data} />;
  return <></>;
};

export default CardData;
