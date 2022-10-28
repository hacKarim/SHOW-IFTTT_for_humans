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
  conditions: any;
};

const appContextDefaultValues: habitsContextType = {
  habits: [],
  addHabit: () => {},
  editHabit: () => {},
  deleteHabit: () => {},
  conditions: [],
};

const HabitsContext = createContext<habitsContextType>(appContextDefaultValues);

export function useHabits() {
  return useContext(HabitsContext);
}

type Props = {
  children: ReactNode;
};

export function HabitsProvider({ children }: Props) {
  const [habits, setHabits] = useState<any>(
    typeof window !== "undefined" && !localStorage.getItem("habits")
      ? localStorage.setItem("habits", JSON.stringify([]))
      : []
  );

  const [conditions, setConditions] = useState<any>([]);

  useEffect(() => {
    let conditionsTemp: any = [];
    habits.forEach((habit: tHabit) => {
      conditionsTemp = conditionsTemp.concat(habit.conditions);
    });
    
    setConditions(Object.entries(conditionsTemp.reduce(function (r:any, a:any) {
      r[a.title] = (r[a.title] || 0) + 1;
      return r;
  }, {})));

    
  }, [habits]);

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
    conditions,
  };

  return (
    <>
      <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
    </>
  );
}
