import Head from "next/head";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { tHabit, tHabits, tAction, tCondition } from "../../helpers";

import { useHabits } from "../../context/AppContext";

import { FiDelete } from "react-icons/fi";
export default function Habit(props: any) {
  const { addHabit, editHabit, deleteHabit, habits } = useHabits();

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const emptyCondition: tCondition = { title: "..." };
  const emptyAction: tAction = { title: "..." };

  useEffect(() => {
    if (props.habit) {
      let habit = props.habit;

      habit.conditions = habit.conditions.filter(
        (condition: tCondition) =>
          condition.title != "..." && condition.title != ""
      );
      habit.actions = habit.actions.filter(
        (action: tAction) => action.title != "..." && action.title != ""
      );

      if (isHovering || isEditing) {
        habit.conditions = habit.conditions.concat(emptyCondition);
        habit.actions = habit.actions.concat(emptyAction);
      }
      editHabit(habit);
    }
  }, [isHovering, isEditing]);

  const onFocus = (e: any, index: any, field: string) => {};

  const onBlur = (e: any, index: any, field: string) => {};

  const onChange = (e: any, index: any, field: string) => {
    let habit = { ...props.habit };

    if (field == "condition") {
      habit.conditions[index].title = e.target.value.replace(/\<br\>/g, " ");
    }
    if (field == "action") {
      habit.actions[index].title = e.target.value.replace(/\<br\>/g, " ");
    }

    editHabit(habit);
    setIsEditing(false);
  };

  const textStyling = { fontSize: "1.5em", fontWeight: "400", opacity: "0.5" };
  const textStylingDimmed = {
    fontSize: "1.5em",
    fontWeight: "600",
    opacity: "0.2",
  };
  const editableStyling = {
    borderBottom: "1px solid",
    cursor: "pointer",
    outline: "0px solid transparent",
    fontWeight: "500",
    opacity: "1",
  };

  const deleteButtonStyling = {
    fontSize: "2em",
    fontWeight: "100",
    cursor: "pointer",
    margin: "0px 0px 0px 20px",
    opacity: "0.5",
  };
  const deleteButtonStylingHidden = {
    fontSize: "2em",
    fontWeight: "100",
    cursor: "pointer",
    margin: "0px 0px 0px 20px",
    opacity: "0",
  };

  return (
    <>
      <div
        style={{ overflow: "hidden", margin: "10px 0px", overflowX: "scroll",paddingLeft: 30}}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          style={{
            width: "max-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          
            
          <span style={textStyling}>if</span>
          {props.habit &&
            props.habit.conditions.map((condition: tCondition, index: any) => {
              return (
                <span key={index}>
                  <span style={textStylingDimmed}>{" { "}</span>
                  <ContentEditable
                    html={condition.title}
                    disabled={false}
                    onChange={(e) => onChange(e, index, "condition")}
                    onFocus={(e) => onFocus(e, index, "condition")}
                    onBlur={(e) => onBlur(e, index, "condition")}
                    tagName="span"
                    style={{ ...textStyling, ...editableStyling }}
                    key={index}
                  />

                  <span style={textStylingDimmed}>{" }"}</span>

                  <span style={textStyling}>
                    {props.habit.conditions.length != index + 1 && <> & </>}
                  </span>
                </span>
              );
            })}

          <span style={textStyling}>, then </span>

          {props.habit &&
            props.habit.actions.map((action: tAction, index: any) => {
              return (
                <span key={index}>
                  <span style={textStylingDimmed}>{"{ "}</span>
                  <ContentEditable
                    html={action.title}
                    disabled={false}
                    onChange={(e) => onChange(e, index, "action")}
                    onFocus={(e) => onFocus(e, index, "action")}
                    onBlur={(e) => onBlur(e, index, "action")}
                    tagName="span"
                    style={{ ...textStyling, ...editableStyling }}
                  />

                  <span style={textStylingDimmed}>{" }"}</span>
                  <span style={textStyling}>
                    {props.habit.actions.length != index + 1 && <> & </>}
                  </span>
                </span>
              );
            })}
            <div
              style={isHovering ? deleteButtonStyling : deleteButtonStylingHidden}
              onClick={() => deleteHabit(props.habit.id)}
            >
              <FiDelete size={20} color={"darkred"} />
            </div>
        </div>
        
      </div>
    </>
  );
}
