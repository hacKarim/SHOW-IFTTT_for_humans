import { tHabit } from ".";

const templateConditions = [
  "⏰ wakeup",
  "😰 anxious",
  "🧘‍♂️ calm",
  "🌛 midnight",
  "💤 sleepy",
  "☹️ hungry",
  "😠 frustrated",
  "🥱 bored",
  "🚬 craving",
];
const templateActions = [
  "🎞️ watch a movie",
  "🚿 shower",
  "📘 read a book",
  "🪥 brush teeth",
  "🥛 drink water",
  "🧘‍♂️ meditate",
  "🍲 prepare food",
  "🧹 clean house",
  "📞 call someone",
  "🚶‍♀️ go for a walk",
];

export const simpleHabit = () : tHabit => {return( {
  id: undefined,
  conditions: [
    {
      title: templateConditions[Math.floor(Math.random() * templateConditions.length)],
    },
  ],
  actions: [
    {
      title: templateActions[Math.floor(Math.random() * templateActions.length)],
    },
  ],
})};
