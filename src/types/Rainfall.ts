import { Card } from './Card';
import { CwbDisplayType } from '../consts/cwbDisplayType';
import { Stations } from '../consts/stations';
import { v4 as uuidv4 } from 'uuid';
import { CardTypes } from '../consts/cardTypes';

export type RainfallData = {
  dataDate: string;
  value: string;
};

export type Rainfall = Card & {
  station: Stations;
  data?: Array<RainfallData>;
};

export const defaultRainfallState = (): Rainfall => ({
  id: uuidv4(),
  displayType: CwbDisplayType.Line,
  station: Stations.Kaohsiung,
  cardType: CardTypes.RAINFALL,
});

export function assertsRainfall(val: any): asserts val is Rainfall {
  if (
    !(
      typeof val === 'object' &&
      'station' in val &&
      'cardType' in val &&
      val.cardType === CardTypes.RAINFALL
    )
  ) {
    throw Error('Rainfall type error');
  }
}
