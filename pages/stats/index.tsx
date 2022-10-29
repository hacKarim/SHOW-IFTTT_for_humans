import { useHabits } from "../../context/AppContext";
import "react-bubble-ui/dist/index.css";
import { TfiTrash } from "react-icons/tfi";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { motion } from "framer-motion";

export default function Conditions() {
  const { actionLog, deleteActionLog } = useHabits();

  if (actionLog.length == 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div style={{ marginTop: "2em", fontSize: "2em", textAlign: "center" }}>
          <div style={{ fontSize: "4em" }}>📜</div>
          {"You didn't start any activity yet."}
        </div>
      </motion.div>
    );
  }

  if (actionLog.length != 0)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div
          style={{
            fontSize: "2em",
            fontWeight: "500",
            // cursor: "pointer",
            width: "100%",
            marginTop: "-10px",
            padding: "10px",
          }}
        >
          {"> cat /logs/*"}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: "center",
            fontSize: "1.5em",
            fontWeight: "bold",
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
                padding: "10px",
              }}
            >
              <div
                style={{
                  width: "40%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {actionLogItem.conditions}
              </div>
              <div
                style={{
                  width: "30%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {actionLogItem.action}
              </div>
              <div
                style={{
                  width: "30%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "right",
                }}
              >
                {moment(actionLogItem.timestamp).fromNow()}
              </div>
              <div>
                <TfiTrash
                  onClick={() => deleteActionLog(actionLogItem.timestamp)}
                  style={{
                    cursor: "pointer",
                    color: "darkRed",
                    marginBottom: "-2px",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
}
