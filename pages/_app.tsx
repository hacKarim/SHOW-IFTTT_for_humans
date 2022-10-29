import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HabitsProvider } from "../context/AppContext";
import Layout from "./../components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HabitsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HabitsProvider>
  );
}
