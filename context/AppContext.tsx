import { createContext, useContext, ReactNode, useState, useEffect } from "react";

import { tHabit, tHabits } from "../helpers";
import { UUID } from "../helpers";
import { initialHabits } from "../helpers/initialHabits";

type habitsContextType = {
  habits: tHabits;
  addHabit: (habit: tHabit) => void;
  editHabit: (habit: tHabit) => void;
  deleteHabit: (id: string) => void;
  conditions: any;
  actionLog: any;
  addActionLog: (actionLogItem: any) => void;
  deleteActionLog: (timestamp: any) => void;
  initializeHabits: () => void;
  isEditingGlobal: any;
  setIsEditingGlobalState: (value: boolean) => void;
};

const appContextDefaultValues: habitsContextType = {
  habits: [],
  addHabit: () => {},
  editHabit: () => {},
  deleteHabit: () => {},
  conditions: [],
  actionLog: [],
  addActionLog: () => {},
  deleteActionLog: () => {},
  initializeHabits: () => {},
  isEditingGlobal: Boolean,
  setIsEditingGlobalState: () => {},
};

const HabitsContext = createContext<habitsContextType>(appContextDefaultValues);

export function useHabits() {
  return useContext(HabitsContext);
}

type Props = {
  children: ReactNode;
};

export function HabitsProvider({ children }: Props) {
  const [conditions, setConditions] = useState<any>([]);
  const [isEditingGlobal, setIsEditingGlobal] = useState<any>(false);

  const [habits, setHabits] = useState<any>(
    typeof window !== "undefined" && !localStorage.getItem("habits")
      ? localStorage.setItem("habits", JSON.stringify([]))
      : []
  );

  const [actionLog, setActionLog] = useState<any>(
    typeof window !== "undefined" && !localStorage.getItem("actionLog")
      ? localStorage.setItem("actionLog", JSON.stringify([]))
      : []
  );

  useEffect(() => {
    let conditionsTemp: any = [];
    habits.forEach((habit: tHabit) => {
      conditionsTemp = conditionsTemp.concat(habit.conditions);
    });

    setConditions(
      Object.entries(
        conditionsTemp.reduce(function (r: any, a: any) {
          r[a.title] = (r[a.title] || 0) + 1;
          return r;
        }, {})
      )
    );
    //each time habits change, the conditions grouped are updated
  }, [habits]);

  useEffect(() => {
    typeof window !== "undefined" && setHabits(JSON.parse(localStorage.getItem("habits") as any));
    typeof window !== "undefined" &&
      setActionLog(JSON.parse(localStorage.getItem("actionLog") as any));
  }, []);

  const addHabit = (habit: tHabit) => {
    let habitWith = habit;
    habitWith.id = UUID();
    habitWith.order = habits.length + 1;
    const tempHabits = habits?.concat(habitWith);

    setHabits(tempHabits);
    localStorage.setItem("habits", JSON.stringify(tempHabits));
  };

  const editHabit = (habit: tHabit) => {
    let habitsFiltered = habits.filter((e: any) => e.id != habit.id);
    const tempHabits = habitsFiltered.concat(habit);
    setHabits(tempHabits);
    localStorage.setItem("habits", JSON.stringify(tempHabits));
  };

  const deleteHabit = (id: String) => {
    const tempHabits = habits
      .filter((habit: any) => habit.id != id)
      .map((habit: any, index: any) => {
        habit.order = index;
        return habit;
      });
    //reset order index after deleting a habit

    setHabits(tempHabits);
    localStorage.setItem("habits", JSON.stringify(tempHabits));
  };

  const initializeHabits = () => {
    const tempHabits = initialHabits.map((habit: any, index: any) => {
      habit.order = index;
      return habit;
    });
    setHabits(tempHabits);
    localStorage.setItem("habits", JSON.stringify(tempHabits));
  };

  const addActionLog = (actionLogItem: any) => {
    const tempActionLog = actionLog?.concat(actionLogItem);
    setActionLog(tempActionLog);
    localStorage.setItem("actionLog", JSON.stringify(tempActionLog));
  };

  const deleteActionLog = (timestamp: any) => {
    const tempActionLog = actionLog.filter((actionLog: any) => actionLog.timestamp != timestamp);
    setActionLog(tempActionLog);
    localStorage.setItem("actionLog", JSON.stringify(tempActionLog));
  };

  const setIsEditingGlobalState = (value: any) => {
    setIsEditingGlobal(value);
  };

  const value = {
    habits,
    addHabit,
    editHabit,
    deleteHabit,
    conditions,
    actionLog,
    addActionLog,
    deleteActionLog,
    initializeHabits,
    isEditingGlobal,
    setIsEditingGlobalState,
  };

  return (
    <>
      <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
    </>
  );
}
