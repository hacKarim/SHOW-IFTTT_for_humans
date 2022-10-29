import React, { useEffect, useState } from "react";

import styles from "./splashScreen.module.css";


export default function SplashScreen(props: any) {
  const [randomElements, setRandomElements] = useState({} as any);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    setRandomElements({
      condition: randomCondition,
      action: randomAction,
    });
    setLoading(false);
  }, []);

  const conditions = [
    "⏰",
    "😰",
    "😒",
    "🌞",
    "😤",
    "🥴",
    "😊",
    "🌙",
    "🎂",
    "‍💻",
    "📬",
    "🎉",
    "💔",
    "🍑",
  ];
  const actions = [
    "🚿",
    "🥐",
    "🍆",
    "🍳",
    "🧘",
    "🚰",
    "🌳",
    "🪥",
    "🧹",
    "♻️",
    "📖",
    "✍️",
    "🚲",
  ];

  if (!loading) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.slottt_machine_recipe}>
            <span className={styles.recipe_if}>if</span>
            <div className={styles.slottt_machine_recipe__mask}>
              <div className={styles.slottt_machine_recipe__items_container}>
                {randomElements.condition}
              </div>
            </div>
            <span className={styles.recipe_then}>then</span>
            <div className={styles.slottt_machine_recipe__mask}>
              <div className={styles.slottt_machine_recipe__items_container}>
                {randomElements.action}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else
  return <></>
}
