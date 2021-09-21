import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {value: string[]} = {
    value: []
}

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {
        addReservation(state, action: PayloadAction<string>){
            state.value.push(action.payload);
        },
        removeReservation(state, {payload}: PayloadAction<number>){
            state.value.splice(payload, 1)
        }
    }
});

export const {addReservation, removeReservation} = reservationSlice.actions;

export default reservationSlice.reducer;