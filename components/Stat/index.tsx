import { useEffect } from "react";
import { useHabits } from "../../context/AppContext";
import { groupBy } from 'lodash';

export default function Stat(props: any) {
  const { actionLog } = useHabits();

  useEffect(
    () =>
      actionLog &&
      actionLog.length > 0 &&
      console.log(
        groupBy(actionLog, 'action')
      )
  );
  return <></>;
}
