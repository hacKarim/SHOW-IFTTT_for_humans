import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

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
  deleteActionLog: (timestamp: string) => void;
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
  setIsEditingGlobalState: ()=>{},
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

  const [actionLog, setActionLog] = useState<any>(
    typeof window !== "undefined" && !localStorage.getItem("actionLog")
      ? localStorage.setItem("actionLog", JSON.stringify([]))
      : []
  );

  const [conditions, setConditions] = useState<any>([]);
  const [isEditingGlobal, setIsEditingGlobal] = useState<any>(false);

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
  }, [habits]);

  useEffect(() => {
    typeof window !== "undefined" &&
      setHabits(JSON.parse(localStorage.getItem("habits") as any));
    typeof window !== "undefined" &&
      setActionLog(JSON.parse(localStorage.getItem("actionLog") as any));
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
    setHabits(
      habits
        .filter((habit: any) => habit.id != id)
        .map((habit: any, index: any) => {
          habit.order = index;
          return habit;
        })
    );
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  const initializeHabits = () => {
    setHabits(
      initialHabits.map((habit: any, index: any) => {
        habit.order = index;
        return habit;
      })
    );
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  const addActionLog = (actionLogItem: any) => {
    setActionLog(actionLog?.concat(actionLogItem));
    localStorage.setItem("actionLog", JSON.stringify(actionLog));
  };

  const deleteActionLog = (timestamp: string) => {
    setActionLog(
      actionLog.filter((actionLog: any) => actionLog.timestamp != timestamp)
    );
    localStorage.setItem("actionLog", JSON.stringify(actionLog));
  };

  const setIsEditingGlobalState = (value: any) =>
  {
    setIsEditingGlobal(value);
  }

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
    setIsEditingGlobalState
  };

  return (
    <>
      <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
    </>
  );
}
