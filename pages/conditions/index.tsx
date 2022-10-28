import type { NextPage } from "next";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";
import BubbleUI from "react-bubble-ui";
import CompanyBubble from "../../components/BubbleUI/Bubble";
import "react-bubble-ui/dist/index.css";
import { tCondition } from "../../helpers";

export default function Conditions() {
  const { addHabit, editHabit, deleteHabit, habits, conditions } = useHabits();
  const [selectedConditions, setselectedConditions] = useState([]) as any;
  const [correspondingActions, setCorrespondingActions] = useState([]) as any;
  const [bubbles, setBubbles] = useState([]) as any;

  const toggleSelection = (conditionTitle: any) => {
    if (selectedConditions.indexOf(conditionTitle) == -1) {
      setselectedConditions(selectedConditions.concat(conditionTitle));
    } else {
      if (selectedConditions.indexOf(conditionTitle) > -1) {
        setselectedConditions(
          selectedConditions.filter((element: any) => element != conditionTitle)
        );
      }
    }
  };

  const bubbleUiOptions = {
    size: 250,
    minSize: 20,
    gutter: 50,
    provideProps: true,
    numCols: 4,
    fringeWidth: 200,
    yRadius: 300,
    xRadius: 200,
    cornerRadius: 10,
    showGuides: true,
    compact: true,
    gravitation: 5,
  };

  const conditionStyling = {
    display: "flex",
    margin: "10px",
    fontSize: selectedConditions.length > 0 ? "1.2em":"2em",
    cursor: "pointer",
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    placeContent: "center",
  };

  const actionStyling = {
    display: "flex",
    margin: "10px",
    fontSize: "2em",
    cursor: "pointer",
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    placeContent: "center",
  };
  const containerStyling = {
    display: "flex",
    margin: "0 auto",
    placeContent: "center space-between",
    alignItems: "center",
    height: selectedConditions.length > 0 ? "20vh" : "45vh",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  };
  const actionContainerStyling = {
    display: "flex",
    margin: "0 auto",
    placeContent: "center flex-start",
    alignItems: "stretch",
    height: selectedConditions.length > 0 ? "80vh" : "45vh",
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "flex-start",
  };

  // useEffect(() => {
  //   setBubbles(
  //     conditions.map((item: any, i: any) => {
  //       return (
  //         <CompanyBubble
  //           condition={item}
  //           key={i}
  //           backgroundColor={dummyColors[i % dummyColors.length]}
  //         />
  //       );
  //     })
  //   );
  // }, [conditions]);

  useEffect(() => {
    // console.log(selectedConditions);
    // console.log(habits);

    let actionsTemp: any = [];
    habits.forEach((habit) => {
      habit.conditions.forEach((condition) => {
        if (selectedConditions.indexOf(condition.title) > -1) {
          habit.actions.forEach((action) => {
            actionsTemp.push(action.title);
          });
        }
      });
    });
    // selectedConditions.forEach((condition :any)=> console.log(condition))
    setCorrespondingActions(actionsTemp);
  }, [selectedConditions]);

  //   const getStockBubbles = () => {
  //     return conditions.map((conditionTitle: any, index: any) => {
  //       return <CompanyBubble conditionTitle={conditionTitle} key={index} />;
  //     });
  //   };

  //   const stockBubbles = conditions.length != 0 && getStockBubbles();
  const dummyColors = ["#F79256", "#FBD1A2", "#7DCFB6", "#00B2CA", "#1D4E89"];

  if (conditions.length != 0)
    return (
      <>
        {/* <BubbleUI className="bubbleUI" options={bubbleUiOptions} style={{height: "100vh", width: "100vw"}}>
        {bubbles}
      </BubbleUI> */}
        <div style={containerStyling as React.CSSProperties}>
          {conditions.map((conditionTitle: any, index: any) => (
            <div
              key={index}
              style={{
                ...conditionStyling,
                ...{
                  fontWeight:
                    selectedConditions.indexOf(conditionTitle[0]) != -1
                      ? 500
                      : 400,
                  background:
                    selectedConditions.indexOf(conditionTitle[0]) != -1
                      ? "black"
                      : "white",
                  color:
                    selectedConditions.indexOf(conditionTitle[0]) != -1
                      ? "white"
                      : "black",
                },
              }}
              onClick={() => {
                toggleSelection(conditionTitle[0]);
              }}
            >
              {conditionTitle[0]}
            </div>
          ))}
        </div>
        {correspondingActions.length > 0 && (
          <div
            style={{ textAlign: "center", fontWeight: "500", fontSize: "2em" }}
          >
            You should do something:{" "}
          </div>
        )}
        <div style={actionContainerStyling as React.CSSProperties}>
          {correspondingActions.map((correspondingAction: any, index: any) => (
            <div
              key={index}
              style={{
                ...actionStyling,
              }}
            >
              {correspondingAction}
            </div>
          ))}
        </div>
      </>
    );
}

/* <div style={containerStyling}>
          {conditions.map((conditionTitle: any, index: any) => (
            // <div
            //   key={index}
            //   style={{...conditionStyling, ...{fontWeight: selectedConditions.indexOf(conditionTitle[0]) != -1 ? 500 : 400}} }
            //   onClick={() => {
            //     toggleSelection(conditionTitle[0]);
            //   }}
              
            // >
            //   {conditionTitle[0]}
            // </div>
            // <CompanyBubble conditionTitle={conditionTitle} key={index}></CompanyBubble>
          ))}
        </div>
             */
