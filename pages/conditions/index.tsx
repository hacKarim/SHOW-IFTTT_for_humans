import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useHabits } from "../../context/AppContext";

export default function Conditions() {
  const { addHabit, editHabit, deleteHabit, habits, conditions } = useHabits();
  const [selectedConditions, setSelectedConditions] = useState([]) as any;

  const toggleSelection = (conditionTitle: any) => {
    if (selectedConditions.indexOf(conditionTitle) == -1) {
      setSelectedConditions(selectedConditions.concat(conditionTitle));
    } else {
      if (selectedConditions.indexOf(conditionTitle) > -1) {
        setSelectedConditions(
          selectedConditions.filter((element: any) => element != conditionTitle)
        );
      }
    }
  };

  const conditionStyling = {
    display: "flex",
    margin: "10px",
    fontSize: "2em",
    cursor: "pointer",
    padding: "10px",
  };
  const containerStyling = {
    display: "flex",
    margin: "0 auto",
    placeContent: "center space-between",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100vh",
    "flex-wrap": "wrap"
  };

  useEffect(() => {}, [conditions]);

  return (
    <>
      {
        <div style={containerStyling}>
          {conditions.map((conditionTitle: any, index: any) => (
            <div
              key={index}
              style={{...conditionStyling, ...{fontWeight: selectedConditions.indexOf(conditionTitle[0]) != -1 ? 500 : 400}} }
              onClick={() => {
                toggleSelection(conditionTitle[0]);
              }}
              
            >
              {conditionTitle[0]}
            </div>
          ))}
        </div>
      }
    </>
  );
}
