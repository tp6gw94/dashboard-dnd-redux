import React, { ReactElement } from 'react';
import Draggable from './Draggable';
import { CardTypes } from '../consts/cardTypes';
import DashboardCard from './DashboardCard';
import FormItem from './FormItem';
import { cwbDataTypeOptions, stationOptions } from '../consts/options';
import BaseButton from './BaseButton';
import { Stations } from '../consts/stations';
import cwbApi from '../apis/cwb';
import { RainfallApiResponse } from '../types/RainfallApiResponse';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { RainfallData } from '../types/Rainfall';
import {
  removeCardFromDashboard,
  updateRainfallCard,
} from '../features/card/cardSlice';
import CardData from './CardData';
import { assertsRainfall } from '../types/Rainfall';
import { Formik } from 'formik';
import SelectField from './SelectField';

type Props = { isEditable?: boolean; close?: boolean; id: string };

export const RainfallCard: React.FC<Props> = ({ id, close = false }) => {
  const card = useAppSelector((root: RootState) =>
    root.card.dashboard.find((card) => card.id === id)
  );
  const dispatch = useAppDispatch();
  assertsRainfall(card);

  const Form = (): ReactElement => (
    <div className="flex justify-between">
      <Formik
        initialValues={{
          station: card.station,
          displayType: card.displayType,
        }}
        enableReinitialize={true}
        onSubmit={async ({ station, displayType }) => {
          const { data } = await getRainfallData(station);
          dispatch(updateRainfallCard({ id, station, displayType, data }));
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <FormItem>
              <span>觀測站：</span>
              <SelectField
                name="station"
                options={stationOptions}
                value={values.station}
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

  const onClose = () => {
    dispatch(removeCardFromDashboard(id));
  };

  return (
    <Draggable
      name="每日雨量記錄"
      id={id}
      close={close}
      data={{ type: CardTypes.RAINFALL }}
      onClose={onClose}
    >
      <DashboardCard
        form={<Form />}
        chart={
          <CardData
            displayType={card.displayType}
            data={JSON.stringify(card.data, null, 2)}
            datasets={card.data?.map(({ value }) => Number(value))}
            labels={card.data?.map(({ dataDate }) => dataDate)}
            datasetName={
              stationOptions.find(({ value }) => value === card.station)?.label
            }
          />
        }
      />
    </Draggable>
  );
};

async function getRainfallData(
  stationId: Stations
): Promise<{ data: Array<RainfallData>; station: string }> {
  try {
    const resp = await cwbApi.get<RainfallApiResponse>('/C-B0025-001', {
      params: { stationId },
    });
    const {
      station: { stationName },
      stationObsTimes: { stationObsTime },
    } = resp.data.records.location[0];
    return {
      data: stationObsTime.map(({ dataDate, weatherElements }) => ({
        dataDate,
        value: weatherElements.precipitation,
      })),
      station: stationName,
    };
  } catch (e) {
    throw e;
  }
}

export default RainfallCard;
