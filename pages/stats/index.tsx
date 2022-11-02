import { useHabits } from "../../context/AppContext";
import { TfiTrash } from "react-icons/tfi";
import styles from "./stats.module.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { motion } from "framer-motion";
import Stat from "../../components/Stat";

export default function Stats() {
  const { actionLog, deleteActionLog } = useHabits();

  if (actionLog.length == 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
        <div className={styles.emptyPlaceholder}>
          <div className={styles.emptyPlaceholder_icon}>📜</div>
          {"You didn't start any activity yet."}
        </div>
      </motion.div>
    );
  }

  if (actionLog.length != 0)
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className={styles.placeholder}>{"> cat /logs/*"}</div>
        <div className={styles.list}>
          {actionLog.map((actionLogItem: any, index: any) => (
            <div key={index} className={styles.row}>
              <div className={styles.scrollable_area}>
                [{moment(actionLogItem.timestamp).fromNow()}] - {actionLogItem.conditions} ⚔️{" "}
                {actionLogItem.action}{" "}
                <TfiTrash
                  onClick={() => deleteActionLog(actionLogItem.timestamp)}
                  className={styles.deleteButton}
                />
              </div>
            </div>
          ))}
        </div>
        <Stat></Stat>
      </motion.div>
    );
}
