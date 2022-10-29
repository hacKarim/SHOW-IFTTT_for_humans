import React, { useEffect, useState } from "react";

import styles from "./splashScreen.module.css";

export default function SplashScreen(props: any) {
  const [randomElements, setRandomElements] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (counter < 25 && !pause) {
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      setRandomElements({
        condition: randomCondition,
        action: randomAction,
      });
      setLoading(false);
      setTimeout(() => {
        setCounter(counter + 1);
      }, 50);
      setTimeout(() => {
        setPause(true);
      }, 2000);
    }
  }, [counter]);

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
      <div
        style={{left:"50%",position:"absolute"
        }}
      >
        <div
          style={{
            fontSize: "3em",
            fontWeight: "600",
            textShadow: "0px 0px 100px white",
            marginTop: "5px",
          }}
        >
          <span
            style={{
              marginTop: "-3px",
              position: "absolute",
              marginLeft: "-115px",
              fontWeight: "bolder",
            }}
          >
            IFTTT
          </span>
          <sup
            style={{
              fontSize: "0.8em",
              marginTop: "10px",
              fontWeight: "100",
              marginLeft: "20px",
              position: "absolute",
              fontFamily: "monospace",
            }}
          >
            [
          </sup>
          <sup
            style={{
              fontSize: "0.4em",
              marginTop: "16px",
              marginLeft: "30px",
              position: "absolute",
              fontFamily: "monospace",
            }}
          >
            for
          </sup>
          <sup
            style={{
              fontSize: "0.4em",
              marginTop: "26px",
              marginLeft: "30px",
              position: "absolute",
              fontFamily: "monospace",
            }}
          >
            humans
          </sup>
          <sup
            style={{
              fontSize: "0.8em",
              fontWeight: "100",
              marginTop: "10px",
              marginLeft: "75px",
              position: "absolute",
              fontFamily: "monospace",
            }}
          >
            ]
          </sup>
        </div>
      </div>
        <div className={styles.container}>
        
          <div className={styles.slottt_machine_recipe}>
            <span className={styles.recipe_if}>
              if{randomElements.condition}
            </span>

            <span className={styles.recipe_then}>
              then{randomElements.action}
            </span>
          </div>
        </div>
      </>
    );
  } else return <></>;
}
