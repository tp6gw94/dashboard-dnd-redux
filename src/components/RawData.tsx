import React from 'react';

type Props = {
  data: any;
};

const RawData: React.FC<Props> = ({ data }) => {
  return <pre>{data}</pre>;
};

export default RawData;
