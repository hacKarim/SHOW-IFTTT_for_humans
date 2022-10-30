import Head from "next/head";
import styles from "./habits.module.css";
import React, { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";
import Habit from "../../components/habit";
import { motion } from "framer-motion";
import { emptyHabit } from "../../helpers/emptyHabit";
import { simpleHabit } from "../../helpers/tinker";

export default function Home() {
  const { addHabit, editHabit, deleteHabit, habits, initializeHabits, isEditingGlobal } =
    useHabits();

  useEffect(() => {}, [habits]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className={styles.container}>
        <main className={styles.main}>
          <div
            className={styles.header}
            style={{ height: '!isEditingGlobal ? "calc(100vh - 160px)" : "calc(100vh - 50px)' }}
          >
            {"const goodHabits = ["}
          </div>
          <div className={styles.habitsContainer}>
            <div></div>
            <div>
              {habits &&
                habits
                  .sort((a: any, b: any) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0))
                  .map((habit: any, index: any) => {
                    return <Habit key={habit.id} habit={habit}></Habit>;
                  })}
            </div>
            <div className={styles.addHabitPlaceholder}>
              <div onClick={() => addHabit(simpleHabit())} className={styles.disabledHabit}>
                <Habit key={emptyHabit.id} habit={emptyHabit} disabled></Habit>
              </div>
              {habits.length == 0 && (
                <>
                  <div className={styles.orText}> OR </div>

                  <div onClick={() => initializeHabits()} className={styles.initializeHabitsButton}>
                    Initialize Habits
                  </div>
                </>
              )}
            </div>
          </div>
          {!isEditingGlobal && (
            <div
              style={{ height: '!isEditingGlobal ? "calc(100vh - 160px)" : "calc(100vh - 50px)' }}
              className={styles.footer}
            >
              {"];"}
            </div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
