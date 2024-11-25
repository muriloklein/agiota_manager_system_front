import { useRouter } from "next/router";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";

function Header() {
  const router = useRouter();

  const handleLogoff = () => {
    sessionStorage.removeItem("ams-token");
    router.push("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.tabs}>
        <Tabs
          id="main-tabs"
          activeKey={router.pathname}
          onSelect={(selectedKey) => {
            if (selectedKey) {
              router.push(selectedKey);
            }
          }}
          className="mb-3"
          justify
        >
          <Tab
            eventKey="/home"
            title={<span className={styles.tabLink}>Clientes</span>}
            tabClassName={router.pathname === "/home" ? styles.tabActive : ""}
          />
          <Tab
            eventKey="/image"
            title={<span className={styles.tabLink}>Imagem</span>}
            tabClassName={router.pathname === "/image" ? styles.tabActive : ""}
          />
          <Tab
            eventKey="/about"
            title={<span className={styles.tabLink}>Sobre</span>}
            tabClassName={router.pathname === "/about" ? styles.tabActive : ""}
          />
        </Tabs>
      </div>
      <Button
        variant="danger"
        className={styles.logoffButton}
        onClick={handleLogoff}
      >
        Log Off
      </Button>
    </div>
  );
}

export default Header;
