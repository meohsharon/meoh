import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import { number } from 'prop-types';
import { id2item, push_non_duplicate, push_non_duplicate_id } from 'src/utils/custom';

export type MainSliceState = {
  // primary
  taskStore: Array<MapPin>,
  refineryStore: Array<Refinery>,
};

const initialState: MainSliceState = {
  // primary
  taskStore: [],
  refineryStore: [
    {
    id: 1, refiner: 'Exxon', location: 'Linden, NJ', fuel_type: 'green_methanol', fuel_type_detail: 'CO2 hydrogenation - e-Methanol', capacity: 5000,
    sources: [{
      source: 'Huron County Wind Farm, MI, USA',
      volume: 5000,
      type: 'Green Hydrogen',
      arrived_at: '2024.03.01 9am - 12pm',
      distance_km: 5583.52,
      transport_by: 'Truck',
      unit: 'barrel',
    },{
      source: 'Maple Ridge Wind Farm, NY, USA',
      volume: 1000,
      type: 'Green Hydrogen',
      arrived_at: '2024.02.28 1am - 5pm',
      distance_km: 5570.48,
      transport_by: 'Pipeline',
      unit: 'barrel',
    },{
      source: 'Ocean Wind 1, Offshore, NJ, USA',
      volume: 800,
      type: 'Green Hydrogen',
      arrived_at: '2024.02.15 2pm - 4pm',
      distance_km: 4170,
      transport_by: 'Pipeline',
      unit: 'barrel',
    },{
      source: 'Mount Olive Solar Farm, NJ, USA',
      volume: 2100,
      type: 'Green Hydrogen',
      arrived_at: '2024.02.10 4am - 7am',
      distance_km: 15495,
      transport_by: 'Truck',
      unit: 'barrel',
    },{
      source: 'Illinois Industrial, IL',
      volume: 20000,
      type: 'Captured CO2',
      arrived_at: '2024.03.01 9am - 12pm',
      distance_km: 5583.52,
      transport_by: 'Truck',
      unit: 'barrel',
    },]
  },
  {
    id: 2, refiner: 'Marathon', location: 'Galveston Bay, TX', fuel_type: 'hfo', fuel_type_detail: 'HFO', capacity: 10000,
    sources: [{
      source: 'US',
      volume: 100000,
      type: 'ANS',
      arrived_at: '2024.03.01 9am - 12pm',
      distance_km: 5583.52,
      transport_by: 'Pipeline',
      unit: 'barrel',
    },{
      source: 'UK',
      volume: 200000,
      type: 'Forties',
      arrived_at: '2024.02.28 1pm - 5pm',
      distance_km: 5570.48,
      transport_by: 'Pipeline, Ship, Trucks',
      unit: 'barrel',
    },{
      source: 'Canada',
      volume: 150000,
      type: 'Midale',
      arrived_at: '2024.02.15 2pm - 4pm',
      distance_km: 4170,
      transport_by: 'Pipeline',
      unit: 'barrel',
    },{
      source: 'Indonesia',
      volume: 150000,
      type: 'Minas',
      arrived_at: '2024.02.10 4am - 7am',
      distance_km: 15495,
      transport_by: 'Pipeline, Ship, Trucks',
      unit: 'barrel',
    },]
  },
  {
    id: 3, refiner: 'Shell', location: 'Martinez, CA', fuel_type: 'biofuel', fuel_type_detail: 'Biofuel(B10)', capacity: 10000,
    sources: [{
      source: 'Indonesia',
      volume: 1000,
      type: 'Fish oil',
      arrived_at: '2024.03.01 9am - 12pm',
      distance_km: 5583.52,
      transport_by: 'Truck',
      unit: 'ton',
    },{
      source: 'Malaysia',
      volume: 2000,
      type: 'Palm Sludge Oil',
      arrived_at: '2024.02.28 1pm - 5pm',
      distance_km: 5570.48,
      transport_by: 'Truck',
      unit: 'ton',
    },{
      source: 'Indonesia',
      volume: 1500,
      type: 'Corn Oil',
      arrived_at: '2024.02.15 2pm - 4pm',
      distance_km: 4170,
      transport_by: 'Truck',
      unit: 'ton',
    },{
      source: 'Indonesia',
      volume: 1500,
      type: 'Palm Sludge Oil',
      arrived_at: '2024.02.10 4am - 7am',
      distance_km: 15495,
      transport_by: 'Truck',
      unit: 'ton',
    },]
  }
  ],
};

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        // primary
        setTaskStore(state, action: PayloadAction<Array<MapPin>>) {
            let tasks: Array<MapPin> = action.payload;
            state.taskStore = tasks;
        },
    },
});

export const {
  // primary
  setTaskStore,
} = mainSlice.actions;

export default mainSlice.reducer;
