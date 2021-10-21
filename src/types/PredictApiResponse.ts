export type PredictApiResponse = {
  records: {
    locations: Array<{
      location: Array<{
        weatherElement: Array<{
          time: Array<{
            startTime: string;
            endTime: string;
            elementValue: Array<{ value: string; measures: string }>;
          }>;
        }>;
      }>;
    }>;
  };
};
