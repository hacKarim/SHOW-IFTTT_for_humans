import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useHabits } from "../context/AppContext";

export default function Index(props: any) {
  const router = useRouter();
  const { habits } = useHabits();

  useEffect(() => {
      habits.length != 0 ? router.push("/conditions") : router.push("/habits");
  }, [habits]);

  return <></>;
}
