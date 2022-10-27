import { createContext, useContext, ReactNode, useState } from "react";

import { tHabit, tHabits, tAction, tCondition } from "../helpers";

import { UUID } from "../helpers";

type habitsContextType = {
  habits: tHabits;
  addHabit: (habit: tHabit) => void;
  editHabit: (habit: tHabit) => void;
  deleteHabit: (id: string) => void;
};

const appContextDefaultValues: habitsContextType = {
  habits: [],
  addHabit: () => {},
  editHabit: () => {},
  deleteHabit: () => {},
};

const HabitsContext = createContext<habitsContextType>(
  appContextDefaultValues
);

export function useHabits() {
  return useContext(HabitsContext);
}

type Props = {
  children: ReactNode;
};

export function HabitsProvider({ children }: Props) {
  const [habits, setHabits] = useState<tHabits>([]);

  const addHabit = (habit: tHabit) => {
    let habitWith = habit;
    habitWith.id = UUID();
    habitWith.order = habits.length + 1;
    setHabits(habits?.concat(habitWith));
  };

  const editHabit = (habit: tHabit) => {
    let habitsFiltered = habits.filter((e) => e.id != habit.id);
    setHabits(habitsFiltered.concat(habit));
  };

  const deleteHabit = (id: String) => {
    setHabits(habits.filter((habit) => habit.id != id));
  };

  const value = {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
  };

  return (
    <>
      <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
    </>
  );
}
