import { useHabits } from "../../context/AppContext";
import "react-bubble-ui/dist/index.css";
import { TfiTrash } from "react-icons/tfi";

import "react-toastify/dist/ReactToastify.css";

export default function Conditions() {
  const { actionLog, deleteActionLog } = useHabits();

  

  if (actionLog.length == 0) {
    return <div style={{marginTop: "2em", fontSize:"2em", textAlign: "center"}}><div style={{fontSize:"4em"}}>📜</div>You didn't start any activity yet.</div>;
  }

  if (actionLog.length != 0)
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          alignContent: "center",
          marginTop:"2em"
        }}
      >
        {actionLog.map((actionLogItem: any, index: any) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
              alignContent: "center",
            }}
          >
            <div>{actionLogItem.conditions}</div>
            <div>{actionLogItem.action}</div>
            <div>{actionLogItem.timestamp}</div>
            <div>
              <TfiTrash
                onClick={() => deleteActionLog(actionLogItem.timestamp)}
                style={{ cursor: "pointer", color: "darkRed" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
}
