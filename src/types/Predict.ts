import { Card } from './Card';
import { Predictors } from '../consts/predictors';
import { ForecastCodes } from '../consts/forecastCodes';
import { v4 as uuidv4 } from 'uuid';
import { CardTypes } from '../consts/cardTypes';
import { CwbDisplayType } from '../consts/cwbDisplayType';

export type PredictData = {
  startTime: string;
  value: string;
};

export type Predict = Card & {
  forecastCode: ForecastCodes;
  predictor: Predictors;
  location: string;
  data?: Array<PredictData>;
};

export function assertsPredict(val: any): asserts val is Predict {
  if (!(typeof val === 'object' && 'predictor' in val)) {
    throw Error('Predict type error');
  }
}

export const defaultPredictState = (): Predict => ({
  id: uuidv4(),
  forecastCode: ForecastCodes.Kaohsiung,
  predictor: Predictors.MinTemperature,
  cardType: CardTypes.PREDICT,
  displayType: CwbDisplayType.Line,
  location: '鳳山區',
});
