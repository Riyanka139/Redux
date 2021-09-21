import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCustomer } from "../features/customerSlice";

interface Customer {
  id: string;
  name: string;
  food: string[];
}

export default function CustomerCard({ id, name, food }: Customer) {
  const [foodInput, setFoodInput] = useState("");

  const dispatch = useDispatch();

  const handlerAddFood = (e: FormEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    if (!foodInput.trim().length) return;

    dispatch(addFoodToCustomer({ id, food: foodInput }));

    setFoodInput("");
  };
  return (
    <div className="customer-food-card-container">
      <p>{name}</p>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map((food) => (
            <p>{food}</p>
          ))}
        </div>

        <div className="customer-food-input-container">
          <input
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />
          <button onClick={(e) => handlerAddFood(e, id)}>Add</button>
        </div>
      </div>
    </div>
  );
}
