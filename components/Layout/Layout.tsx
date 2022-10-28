import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.Root}>
      <Head>
        <title>{"{...ifttt}"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.MainView}>{children}</main>
      <footer className={styles.Footer}>
        <Link href={"/"}>
          <div>Habits</div>
        </Link>
        <Link href={"/conditions"}>
          <div>What to do now ?</div>
        </Link>
        <Link href={"/stats"}>
          <div>Stats</div>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
