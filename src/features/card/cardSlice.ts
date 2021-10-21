import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageJsonVal } from '../../utils/getLocalStorageJsonVal';
import { assertsPredict, Predict } from '../../types/Predict';
import { assertsRainfall, Rainfall } from '../../types/Rainfall';

export type DashboardCard = Predict | Rainfall;
export type DashboardCards = Array<DashboardCard>;

export interface CardState {
  dashboard: DashboardCards;
}

const initialState: CardState = {
  dashboard: getLocalStorageJsonVal<DashboardCards>('dashboard') || [],
};

type UpdateRainfallCardPayload = PayloadAction<
  Pick<Rainfall, 'station' | 'displayType' | 'data' | 'id'>
>;

type UpdatePredictCardPayload = PayloadAction<
  Pick<
    Predict,
    'id' | 'predictor' | 'forecastCode' | 'displayType' | 'location' | 'data'
  >
>;

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCardToDashboard: (state, action: PayloadAction<DashboardCard>) => {
      state.dashboard.push(action.payload);
    },
    removeCardFromDashboard: (state, action: PayloadAction<string>) => {
      state.dashboard = state.dashboard.filter(
        ({ id }) => id !== action.payload
      );
    },
    updateRainfallCard: (state, action: UpdateRainfallCardPayload) => {
      const card = state.dashboard.find(({ id }) => action.payload.id === id);
      assertsRainfall(card);
      const { station, displayType, data } = action.payload;
      card.station = station;
      card.displayType = displayType;
      card.data = data;
    },
    updatePredictCard: (state, action: UpdatePredictCardPayload) => {
      const card = state.dashboard.find(({ id }) => action.payload.id === id);
      assertsPredict(card);
      const { predictor, forecastCode, displayType, location, data } =
        action.payload;
      card.predictor = predictor;
      card.forecastCode = forecastCode;
      card.displayType = displayType;
      card.location = location;
      card.data = data;
    },
    saveDashboard: (state) => {
      localStorage.setItem('dashboard', JSON.stringify(state.dashboard));
    },
  },
});

export const {
  addCardToDashboard,
  removeCardFromDashboard,
  updateRainfallCard,
  updatePredictCard,
  saveDashboard,
} = cardSlice.actions;
export default cardSlice.reducer;
