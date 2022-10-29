import Head from "next/head";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";
import { tHabit, tHabits, tAction, tCondition } from "../../helpers";
import Habit from "../../components/habit";
import { motion } from "framer-motion";

export default function Home() {
  const { addHabit, editHabit, deleteHabit, habits, initializeHabits, isEditingGlobal } =
    useHabits();
  const addHabitStyling = {
    fontSize: "2em",
    fontWeight: "500",
    // cursor: "pointer",
    width: "100%",
    marginTop: "-10px",
    padding: "10px",
  };

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

  useEffect(() => {}, [habits]);

  const simpleHabit: tHabit = {
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
  };

  const emptyHabit: tHabit = {
    id: undefined,
    conditions: [
      {
        title: "...",
      },
    ],
    actions: [
      {
        title: "...",
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        <main className={styles.main}>
          <div style={addHabitStyling}>{"const goodHabits = ["}</div>
          <div
            style={{
              height: !isEditingGlobal ? "calc(100vh - 160px)" : "calc(100vh - 50px)",
              // overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <div></div>
            <div>
              {habits &&
                habits
                  .sort((a: any, b: any) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0))
                  .map((habit: any, index: any) => {
                    return <Habit key={habit.id} habit={habit}></Habit>;
                  })}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={() => addHabit(simpleHabit)}
                style={{ cursor: "pointer", width: "fit-content" }}
              >
                <Habit key={emptyHabit.id} habit={emptyHabit} disabled></Habit>
              </div>
              {habits.length == 0 && (
                <>
                  <div style={{ fontSize: "1.5em", fontFamily: "monospace" }}> OR </div>

                  <div
                    onClick={() => initializeHabits()}
                    style={{
                      cursor: "pointer",
                      width: "fit-content",
                      background: "#f7f7f7",
                      color: "#666",
                      padding: 19,
                      height: "auto",
                      fontSize: "1.5em",
                      borderRadius: 10,
                    }}
                  >
                    Initialize Habits
                  </div>
                </>
              )}
            </div>
          </div>
          {!isEditingGlobal && <div style={addHabitStyling}>{"];"}</div>}
        </main>
      </div>
    </motion.div>
  );
}
