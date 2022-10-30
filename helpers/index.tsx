export type tHabits = tHabit[];

export type tHabit = {
  id?: string;
  order?: number;
  conditions: tCondition[];
  actions: tAction[];
};

export type tAction = {
  title: string;
};

export type tCondition = {
  title: string;
};

export const UUID = (): string => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


//TODO: Add other types : actionLogItem