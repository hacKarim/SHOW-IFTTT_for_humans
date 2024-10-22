import { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";
import "react-bubble-ui/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";

export default function Conditions() {
  const { habits, conditions, addActionLog, actionLog } = useHabits();
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
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      style: {
        fontSize: "2em",
        width: "100vw",
        // left: "0%",
        height: "100vh",
        maxHeight: "unset",
        maxWidth: "unset",
        textAlign: "center",
        margin: "0px",
      },
    });

  const conditionStyling = {
    display: "flex",
    margin: "10px",
    fontSize: selectedConditions.length > 0 ? "1.2em" : "2em",
    cursor: "pointer",
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    width: "fit-content",
    whiteSpace: "nowrap" as "nowrap",
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
    // flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    overflow: "scroll",
  };
  const actionContainerStyling = {
    display: "flex",
    margin: "0 auto",
    placeContent: "center flex-start",
    alignItems: "stretch",
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "700px",
    overflow: "scroll",
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

  if (conditions.length == 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
      <div style={{ marginTop: "2em", fontSize: "2em", textAlign: "center" }}>
        <div style={{ fontSize: "4em" }}>🔁</div>
        {"You don't have any routines yet"}
      </div>
      </motion.div>
    );
  }

  if (conditions.length != 0)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div
          style={{
            height: "100vh",
            display: "block",
          }}
        >
          <div
            style={{
              fontSize: "2em",
              fontWeight: "700",
              // cursor: "pointer",
              width: "100%",
              marginTop: "-10px",
              padding: "10px",
            }}
          >
            {"promise conditions = ["}
          </div>
          <div
            style={
              {
                ...containerStyling,
                ...{
                  flexWrap: selectedConditions.length == 0 ? "wrap" : "unset",
                  placeContent: selectedConditions.length == 0 ? "center" : "unset",
                },
              } as React.CSSProperties
            }
          >
            {conditions.map((conditionTitle: any, index: any) => (
              <div
                key={index}
                style={{
                  ...conditionStyling,
                  ...{
                    fontWeight: selectedConditions.indexOf(conditionTitle[0]) != -1 ? 500 : 400,
                    background:
                      selectedConditions.indexOf(conditionTitle[0]) != -1 ? "black" : "white",
                    color: selectedConditions.indexOf(conditionTitle[0]) != -1 ? "white" : "black",
                  },
                }}
                onClick={() => {
                  toggleSelection(conditionTitle[0]);
                }}
              >
                <p style={{ textAlign: "center", margin: "0px" }}>{conditionTitle[0]}</p>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "2em",
              fontWeight: "700",
              // cursor: "pointer",
              width: "100%",
              marginTop: "-10px",
              padding: "10px",
            }}
          >
            {"];"}
          </div>
          {correspondingActions.length > 0 && (
            <div
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: "1.5em",
                marginTop: "50px",
              }}
            >
              {"("}{selectedConditions.join(").(")}{").then() => {"}
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
                  notify(
                    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                      <div style={{ fontSize: "4em" }}>👏 🦄</div>
                      <br />
                      <div
                        style={{
                          background: "#f7f7f7",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <h3>
                          {"if ("} {selectedConditions.join(" & ")}
                          {")"}{" "}
                        </h3>
                        <h3>
                          {"then {"} {correspondingAction} {"};  "}
                        </h3>
                        x{" "}
                        {actionLog.filter(
                          (actionLogItem: any) =>
                            actionLogItem.action == correspondingAction &&
                            JSON.stringify(actionLogItem.conditions.sort()) ==
                              JSON.stringify(selectedConditions.sort())
                        ).length + 1}
                      </div>
                      <br />
                      <br />
                    </div>
                  );
                  setselectedConditions([]);
                }}
              >
                {correspondingAction}
              </div>
              
              
            ))}
          </div>
          <div
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: "1.5em",
                display: selectedConditions.length == 0 ? "none" : "block"
              }}
            >
              {"}"}
            </div>


          <ToastContainer />
        </div>
      </motion.div>
    );
}
