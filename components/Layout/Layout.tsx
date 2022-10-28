import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";
import { TfiLoop, TfiHeartBroken, TfiBookmarkAlt } from "react-icons/tfi";

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
          <div>
            <TfiLoop />
          </div>
        </Link>
        <Link href={"/conditions"}>
          <div>
            <TfiHeartBroken />
          </div>
        </Link>
        <Link href={"/stats"}>
          <div>
            <TfiBookmarkAlt />
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
