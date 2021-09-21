import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { v4 as uuid } from "uuid";
import { RootState } from "./app/store";
import { addCustomer } from "./features/customerSlice";
import { addReservation, removeReservation } from "./features/reservationSlice";
import CustomerCard from "./componants/CustomerCard";

function App() {
  const [reservationInput, setReservationInput] = useState("");

  const reservations = useSelector(
    (state: RootState) => state.reservation.value
  );

  const customers = useSelector((state: RootState) => state.customer.value);

  const dispatch = useDispatch();

  const addHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!reservationInput.trim().length) return;

    dispatch(addReservation(reservationInput));

    setReservationInput("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((reservation, index) => (
                <div
                  className="reservation-card-container"
                  key={index}
                  onClick={() => {
                    dispatch(removeReservation(index));
                    dispatch(
                      addCustomer({
                        id: uuid(),
                        name: reservation,
                        food: [],
                      })
                    );
                  }}
                >
                  {reservation}
                </div>
              ))}
            </div>
          </div>
          <div className="reservation-input-container">
            <input
              value={reservationInput}
              onChange={(e) => setReservationInput(e.target.value)}
            />
            <button onClick={addHandler}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} id={customer.id} name={customer.name} food={customer.food}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
