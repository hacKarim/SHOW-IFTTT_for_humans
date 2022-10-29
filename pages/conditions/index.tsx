import { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";
import "react-bubble-ui/dist/index.css";
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce  } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Conditions() {
  const { habits, conditions, addActionLog } = useHabits();
  const [selectedConditions, setselectedConditions] = useState([]) as any;
  const [correspondingActions, setCorrespondingActions] = useState([]) as any;

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

  const notify = (text: any) =>
    toast(text, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      style:{
        fontSize: "2em",
        width:"100vw",
        // left: "0%",
        height: "100vh",
        maxHeight: "unset",
        maxWidth: "unset",
        textAlign: "center",
        margin:"0px"
      }
    });

  const conditionStyling = {
    display: "flex",
    margin: "10px",
    fontSize: selectedConditions.length > 0 ? "1.2em" : "2em",
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

  useEffect(() => {
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
    setCorrespondingActions(
      actionsTemp.filter((element: any, index: any) => {
        return actionsTemp.indexOf(element) === index;
      })
    );
  }, [selectedConditions]);

  if (conditions.length != 0)
    return (
      <>
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
              onClick={() => {
                addActionLog({
                  conditions: selectedConditions,
                  action: correspondingAction,
                  timestamp: Date.now(),
                });
                notify(<><div style={{fontSize:"4em"}}>🦄</div>Bravo 👏 for <br/><br/>[ {correspondingAction} ]</>);
                setselectedConditions([]);
              }}
            >
              {correspondingAction}
            </div>
          ))}
        </div>
        <ToastContainer />
      </>
    );
}
