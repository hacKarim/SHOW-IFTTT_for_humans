import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useHabits } from "../context/AppContext";
import SplashScreen from "../components/SpashScreen";

export default function Index(props: any) {
  const router = useRouter();
  const { habits } = useHabits();

  useEffect(() => {
      const tempHabits = habits;
      setTimeout(() => {
        tempHabits.length > 0 ? router.push("/conditions") : router.push("/habits");
      }, 3000);
  }, [habits]);

  return (
      <SplashScreen></SplashScreen>
  );
}
