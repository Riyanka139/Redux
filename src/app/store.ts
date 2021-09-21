import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from '../features/reservationSlice';
import customerReducer from '../features/customerSlice';

export const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    customer: customerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
