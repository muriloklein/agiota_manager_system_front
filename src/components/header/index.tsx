import { useRouter } from "next/router";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./styles.module.css";

function Header() {
  const router = useRouter();

  return (
    <Tabs
      id="main-tabs"
      activeKey={router.pathname}
      onSelect={(selectedKey) => {
        if (selectedKey) {
          router.push(selectedKey);
        }
      }}
      className={`${styles.headerContainer} mb-3`}
      justify
    >
      <Tab
        eventKey="/"
        title={<span className={styles.tabLink}>Clientes</span>}
        tabClassName={router.pathname === "/home" ? styles.tabActive : ""}
      />
      <Tab
        eventKey="/image"
        title={<span className={styles.tabLink}>Imagem</span>}
        tabClassName={router.pathname === "/image" ? styles.tabActive : ""}
      />
    </Tabs>
  );
}

export default Header;
