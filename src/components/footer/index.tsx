import { Container } from "reactstrap";
import styles from "./styles.module.css";

const Footer = function () {
  return (
    <div className={styles.footerContainer}>
      <Container>
        <p>
          Desenvolvido por{" "}
          <a
            className={styles.footerLink}
            href="https://github.com/muriloklein"
            target="_blank"
            rel="noopener noreferrer"
          >
            Murilo Klein
          </a>
        </p>
      </Container>
    </div>
  );
};

export default Footer;
