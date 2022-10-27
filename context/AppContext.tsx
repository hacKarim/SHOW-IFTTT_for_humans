import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

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

const HabitsContext = createContext<habitsContextType>(appContextDefaultValues);

export function useHabits() {
  return useContext(HabitsContext);
}

type Props = {
  children: ReactNode;
};

export function HabitsProvider({ children }: Props) {
  // useEffect(() => {
  //   setTasks(JSON.parse(localStorage.getItem("tasks")));
  // }, []);

  const [habits, setHabits] = useState<any>(
    typeof window !== "undefined" && !localStorage.getItem("habits")
      ? localStorage.setItem("habits", JSON.stringify([]))
      : []
  );

  useEffect(() => {
    typeof window !== "undefined" &&
      setHabits(JSON.parse(localStorage.getItem("habits") as any));
  }, []);

  const addHabit = (habit: tHabit) => {
    let habitWith = habit;
    habitWith.id = UUID();
    habitWith.order = habits.length + 1;
    setHabits(habits?.concat(habitWith));
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  const editHabit = (habit: tHabit) => {
    let habitsFiltered = habits.filter((e: any) => e.id != habit.id);
    setHabits(habitsFiltered.concat(habit));
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  const deleteHabit = (id: String) => {
    setHabits(habits.filter((habit: any) => habit.id != id));
    localStorage.setItem("habits", JSON.stringify(habits));
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
