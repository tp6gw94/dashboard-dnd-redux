export type RainfallApiResponse = {
  records: {
    location: Array<{
      station: {
        stationName: string;
      };
      stationObsTimes: {
        stationObsTime: Array<{
          dataDate: string;
          weatherElements: {
            precipitation: string;
          };
        }>;
      };
    }>;
  };
};
