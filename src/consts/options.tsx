import { Options } from '../types/Options';
import { Predictors } from './predictors';
import { ForecastCodes } from './forecastCodes';
import { CwbDisplayType } from './cwbDisplayType';
import { Stations } from './stations';

export const predictorOptions: Options = [
  { label: '最高溫度', value: Predictors.MaxTemperature },
  { label: '最低溫度', value: Predictors.MinTemperature },
  { label: '溼度', value: Predictors.Humidity },
];

export const cityOptions: Options = [
  { label: '高雄', value: ForecastCodes.Kaohsiung },
  { label: '臺南', value: ForecastCodes.Taina },
  { label: '臺中', value: ForecastCodes.Taichung },
];

export const cwbDataTypeOptions: Options = [
  { label: '曲線圖', value: CwbDisplayType.Line },
  { label: '原始資料', value: CwbDisplayType.RawData },
];

export const locationOptions = (city: ForecastCodes): Options => {
  switch (city) {
    case ForecastCodes.Kaohsiung:
      return [
        { label: '鳳山區', value: '鳳山區' },
        { label: '橋頭區', value: '橋頭區' },
      ];
    case ForecastCodes.Taichung:
      return [
        { label: '北屯區', value: '北屯區' },
        { label: '大安區', value: '大安區' },
      ];
    case ForecastCodes.Taina:
      return [
        { label: '安南區', value: '安南區' },
        { label: '東山區', value: '東山區' },
      ];
    default:
      throw Error('location option error');
  }
};

export const stationOptions: Options = [
  { label: '高雄', value: Stations.Kaohsiung },
  { label: '臺中', value: Stations.Taichung },
  { label: '臺北', value: Stations.Taipei },
];
