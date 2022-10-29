import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useHabits } from "../context/AppContext";
import SplashScreen from "../components/SpashScreen";

export default function Index(props: any) {
  const router = useRouter();
  const { habits } = useHabits();

  useEffect(() => {
      setTimeout(() => {
        habits.length > 0 ? router.push("/conditions") : router.push("/habits");
      }, 2000);
  }, [habits]);

  return (
      <SplashScreen></SplashScreen>
  );
}
