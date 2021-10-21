import React from 'react';
import Sidebar from '../layout/Sidebar';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Droppable from './Droppable';
import PredictCard from './PredictCard';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addCardToDashboard } from '../features/card/cardSlice';
import { CardTypes } from '../consts/cardTypes';
import RainfallCard from './RainfallCard';
import { defaultRainfallState } from '../types/Rainfall';
import { defaultPredictState } from '../types/Predict';

const Dashboard: React.FC = () => {
  const dashboardCards = useAppSelector(
    (state: RootState) => state.card.dashboard
  );
  const dispatch = useAppDispatch();
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex flex-no-wrap">
        <Sidebar />
        <div className="w-full container mx-auto p-4 space-y-4 flex flex-wrap flex-col">
          {Object.values(dashboardCards).map(({ id, cardType }) => (
            <Droppable key={id} id={id}>
              {cardType === CardTypes.PREDICT && (
                <PredictCard close={true} id={id} />
              )}
              {cardType === CardTypes.RAINFALL && (
                <RainfallCard close={true} id={id} />
              )}
            </Droppable>
          ))}
          <Droppable id="empty" />
        </div>
      </div>
    </DndContext>
  );

  function onDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (!over) return;
    const cardType = active.data.current?.type;

    switch (cardType) {
      case CardTypes.PREDICT:
        dispatch(addCardToDashboard(defaultPredictState()));
        break;
      case CardTypes.RAINFALL:
        dispatch(addCardToDashboard(defaultRainfallState()));
        break;
    }
  }
};

export default Dashboard;
