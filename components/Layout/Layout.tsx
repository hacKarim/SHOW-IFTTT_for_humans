import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";
import { TfiLoop, TfiHeartBroken, TfiBookmarkAlt } from "react-icons/tfi";
import { Badge } from "@nextui-org/react";
import { useHabits } from "../../context/AppContext";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { actionLog } = useHabits();

  return (
    <div className={styles.Root}>
      <Head>
        <title>{"{...ifttt}"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.MainView}>{children}</main>
      <footer className={styles.Footer}>
        <Link href={"/habits"}>
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
            <Badge color="error" content={actionLog.length} isInvisible={actionLog.length == 0}>
              <TfiBookmarkAlt />
            </Badge>
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
