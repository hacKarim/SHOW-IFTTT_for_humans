import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HabitsProvider } from "../context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HabitsProvider>
      <Component {...pageProps} />
    </HabitsProvider>
  );
}
