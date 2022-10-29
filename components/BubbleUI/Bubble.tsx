import React from "react";
import styles from "./Bubble.module.css";
export default function CompanyBubble(props: any) {
  return (
    <div
      style={{
        backgroundColor: props.backgroundColor + "d0",
        overflow: "hidden",
      }}
      className={styles.companyBubble}
    >
      {true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.1s ease",
            opacity: props.bubbleSize > 50 ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              color: props.textColor,
              fontSize: "4em",
              marginBottom: "1em",
              maxWidth: 250,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {props.condition[0]}
          </p>
          <p
            style={{
              color: props.textColor,
              fontSize: 14,
              marginBottom: 5,
              maxWidth: 100,
              opacity: 0.5,
            }}
          >
            {props.symbol}
          </p>
        </div>
      ) : null}
    </div>
  );
}
