import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Customer {
  id: string;
  name: string;
  food: string[];
}

interface Food {
  id: string;
  food: string;
}

const initialState: { value: Customer[] } = {
  value: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer(state, { payload }: PayloadAction<Customer>) {
      state.value.push(payload);
    },
    addFoodToCustomer(state, { payload }: PayloadAction<Food>) {
      const customer = state.value.find(
        (customer) => customer.id === payload.id
      );
      customer?.food.push(payload.food);
    },
  },
});

export const { addCustomer, addFoodToCustomer } = customerSlice.actions;

export default customerSlice.reducer;
