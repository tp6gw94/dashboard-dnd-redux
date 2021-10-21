import React, { ReactElement } from 'react';
import DashboardCard from './DashboardCard';
import {
  cwbDataTypeOptions,
  cityOptions,
  predictorOptions,
  locationOptions,
} from '../consts/options';
import { Predictors } from '../consts/predictors';
import { ForecastCodes } from '../consts/forecastCodes';
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
import CardData from './CardData';
import SelectField from './SelectField';
import { Formik } from 'formik';

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

  const Form = (): ReactElement => (
    <div className="flex justify-between">
      <Formik
        initialValues={{
          predictor: card.predictor,
          forecastCode: card.forecastCode,
          location: card.location,
          displayType: card.displayType,
        }}
        enableReinitialize={true}
        onSubmit={async ({
          displayType,
          predictor,
          forecastCode,
          location,
        }) => {
          console.log(displayType, predictor, forecastCode, location);
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
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <FormItem>
              <span>觀測站：</span>
              <SelectField
                name="predictor"
                options={predictorOptions}
                value={values.predictor}
              />
            </FormItem>
            <FormItem>
              <span>縣市位置：</span>
              <SelectField
                name="forecastCode"
                options={cityOptions}
                value={values.forecastCode}
              />
            </FormItem>
            <FormItem>
              <span>鄉鎮位置：</span>
              <SelectField
                name="location"
                options={locationOptions(values.forecastCode)}
                value={values.location}
              />
            </FormItem>
            <FormItem>
              <span>顯示方式：</span>
              <SelectField
                name="displayType"
                options={cwbDataTypeOptions}
                value={values.displayType}
              />
            </FormItem>
            <BaseButton
              type="submit"
              variant={isSubmitting ? 'secondary' : 'primary'}
            >
              {isSubmitting ? 'Loading' : '確認'}
            </BaseButton>
          </form>
        )}
      </Formik>
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
              datasetName={card.location}
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
