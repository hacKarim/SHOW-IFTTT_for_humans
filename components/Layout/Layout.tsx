import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";
import { TfiLoop, TfiHeartBroken, TfiBookmarkAlt } from "react-icons/tfi";
import { Badge } from "@nextui-org/react";
import { useHabits } from "../../context/AppContext";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { actionLog } = useHabits();
  const router = useRouter();

  return (
    <div className={styles.Root}>
      <Head>
        <title>{"{...ifttt}"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="https://guelguin.github.io/IFTTT/manifest.json" />
        <meta name="theme-color" content="#fff" />
      </Head>

      <main className={styles.MainView}>{children}</main>
      <footer
        className={styles.Footer}
        style={{ display: router.pathname == "/" ? "none" : "flex" }}
      >
        <Link
          href={"/habits"}
          style={{ width: "inherit", textAlign: "center" }}
        >
          <div>
            <TfiLoop
              style={{
                color: router.pathname == "/habits" ? "black" : "grey",
              }}
            />
          </div>
        </Link>
        <Link
          href={"/conditions"}
          style={{ width: "inherit", textAlign: "center" }}
        >
          <div>
            <TfiHeartBroken
              style={{
                color: router.pathname == "/conditions" ? "black" : "grey",
              }}
            />
          </div>
        </Link>
        <Link href={"/stats"} style={{ width: "inherit", textAlign: "center" }}>
          <div style={{ marginTop: "-10px" }}>
            <Badge
              color="error"
              content={actionLog.length}
              isInvisible={actionLog.length == 0}
            >
              <TfiBookmarkAlt
                style={{
                  color: router.pathname == "/stats" ? "black" : "grey",
                }}
              />
            </Badge>
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
