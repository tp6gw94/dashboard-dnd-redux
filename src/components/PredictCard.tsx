import React, { FormEvent, ReactElement, useState } from 'react';
import DashboardCard from './DashboardCard';
import {
  cwbDataTypeOptions,
  cityOptions,
  predictorOptions,
  locationOptions,
} from '../consts/options';
import { Predictors } from '../consts/predictors';
import { ForecastCodes } from '../consts/forecastCodes';
import { CwbDisplayType } from '../consts/cwbDisplayType';
import Draggable from './Draggable';
import { CardTypes } from '../consts/cardTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeCardFromDashboard,
  updatePredictCard,
} from '../features/card/cardSlice';
import EmptyCard from './EmptyCard';
import cwbApi from '../apis/cwb';
import BaseButton from './BaseButton';
import { PredictApiResponse } from '../types/PredictApiResponse';
import FormItem from './FormItem';
import { RootState } from '../app/store';
import { assertsPredict, PredictData } from '../types/Predict';
import FormSelect from './FormSelect';
import CardData from './CardData';

type Props = {
  isEditable?: boolean;
  id: string;
  close?: boolean;
};

type PredictApiInput = {
  city: ForecastCodes;
  predictor: Predictors;
  location: string;
};

const PredictCard: React.FC<Props> = ({
  isEditable = true,
  id,
  close = false,
}) => {
  const card = useAppSelector((state: RootState) =>
    state.card.dashboard.find((card) => card.id === id)
  );
  const dispatch = useAppDispatch();
  assertsPredict(card);

  const [predictor, setPredictor] = useState(card.predictor);
  const [forecastCode, setForecastCode] = useState(card.forecastCode);
  const [displayType, setDisplayType] = useState(card.displayType);
  const [location, setLocation] = useState(card.location);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const predictData = await getPredictData({
      city: forecastCode,
      predictor: predictor,
      location: location,
    });
    dispatch(
      updatePredictCard({
        id,
        predictor,
        forecastCode,
        displayType,
        location,
        data: predictData,
      })
    );
    setIsLoading(false);
  };

  const Form = (): ReactElement => (
    <div className="flex justify-between">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <FormItem>
          <span>預測項目：</span>
          <FormSelect
            options={predictorOptions}
            value={predictor}
            onChange={(e) => setPredictor(e.target.value as Predictors)}
          />
        </FormItem>
        <FormItem>
          <span>縣市位置：</span>
          <FormSelect
            options={cityOptions}
            value={forecastCode}
            onChange={(e) => setForecastCode(e.target.value as ForecastCodes)}
          />
        </FormItem>
        <FormItem>
          <span>鄉鎮位置：</span>
          <FormSelect
            options={locationOptions(forecastCode)}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <span>顯示方式：</span>
          <FormSelect
            options={cwbDataTypeOptions}
            value={displayType}
            onChange={(e) =>
              setDisplayType(Number(e.target.value) as CwbDisplayType)
            }
          />
        </FormItem>
        <BaseButton type="submit" variant={isLoading ? 'secondary' : 'primary'}>
          {isLoading ? 'loading...' : '確認'}
        </BaseButton>
      </form>
    </div>
  );

  return (
    <Draggable
      onClose={() => dispatch(removeCardFromDashboard(id))}
      close={close}
      data={{ type: CardTypes.PREDICT }}
      id={id}
      name="預測天氣卡片"
    >
      {isEditable ? (
        <DashboardCard
          form={<Form />}
          chart={
            <CardData
              displayType={card.displayType}
              data={JSON.stringify(card.data, null, 2)}
              datasetName={location}
              datasets={card.data?.map(({ value }) => Number(value))}
              labels={card.data?.map(({ startTime }) => startTime)}
            />
          }
        />
      ) : (
        <EmptyCard title="預測天氣卡片" variant="green" />
      )}
    </Draggable>
  );
};

async function getPredictData({
  city,
  predictor,
  location,
}: PredictApiInput): Promise<Array<PredictData>> {
  try {
    const resp = await cwbApi.get<PredictApiResponse>(`/${city}`, {
      params: { elementName: predictor, locationName: location, sort: 'time' },
    });
    return resp.data.records.locations[0].location[0].weatherElement[0].time.map(
      ({ startTime, elementValue }) => ({
        startTime,
        value: elementValue[0].value,
      })
    );
  } catch (e) {
    throw e;
  }
}

export default PredictCard;
