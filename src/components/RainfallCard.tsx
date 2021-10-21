import React, { FormEvent, ReactElement, useState } from 'react';
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
import { CwbDisplayType } from '../consts/cwbDisplayType';
import FormSelect from './FormSelect';
import { assertsRainfall } from '../types/Rainfall';

type Props = { isEditable?: boolean; close?: boolean; id: string };

export const RainfallCard: React.FC<Props> = ({ id, close = false }) => {
  const card = useAppSelector((root: RootState) =>
    root.card.dashboard.find((card) => card.id === id)
  );
  const dispatch = useAppDispatch();
  assertsRainfall(card);

  const [station, setStation] = useState(card.station);
  const [displayType, setDisplayType] = useState(card.displayType);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const { data } = await getRainfallData(station);
    dispatch(updateRainfallCard({ id, station, displayType, data }));
    setIsLoading(false);
    console.log(data);
  };

  const Form = (): ReactElement => (
    <div className="flex justify-between">
      <form onSubmit={(e) => handleSubmit(e)} className="flex space-x-4">
        <FormItem>
          <span>觀測站：</span>
          <FormSelect
            options={stationOptions}
            value={station}
            onChange={(e) => setStation(e.target.value as Stations)}
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
