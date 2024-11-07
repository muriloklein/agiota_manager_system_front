import Head from "next/head";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/components/footer";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../services/authService";
import styles from "../styles/login.module.css";

const Login = function () {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ams-token")) {
      router.push("/home");
    }
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("usuario")!.toString();
    const pin = formData.get("password")!.toString();
    const params = { name, pin };

    const response = await authService.login(params);

    const status = response?.status;
    console.log(status);

    if (status == 200) {
      sessionStorage.setItem("ams-token", response.data.token);
      router.push("/home").then(() => window.location.reload());
    } else {
      setErrorMessage("Usuário ou senha incorretos. Tente novamente.");
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("usuario")!.toString();
    const pin = formData.get("password")!.toString();
    const params = { name, pin };

    const response = await authService.register(params);
    const status = response?.status;

    if (status === 201) {
      alert("Usuário registrado com sucesso!");
      setIsRegister(false);
    } else {
      setErrorMessage("Erro ao registrar o usuário. Tente novamente.");
    }
  };

  return (
    <>
      <Head>
        <title>AMS - {isRegister ? "Registro" : "Login"}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.loginContainer}>
        <Container>
          <section className={styles.formes}>
            <Form onSubmit={isRegister ? handleRegister : handleLogin}>
              <p className={styles.title}>
                <strong>
                  Bem-vindo(a) ao <br /> Agiota Manager System!
                </strong>
              </p>
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <FormGroup className={styles.formGroup}>
                <Label for="usuario">USUÁRIO</Label>
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Qual o seu usuário?"
                  required
                />
              </FormGroup>
              <FormGroup className={styles.formGroup}>
                <Label for="password">SENHA</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Qual a sua senha?"
                  required
                />
              </FormGroup>
              <Button className={styles.submitButton} type="submit" outline>
                {isRegister ? "REGISTRAR" : "ENTRAR"}
              </Button>
            </Form>
            <Button
              color="link"
              className={styles.toggleButton}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Registre-se"}
            </Button>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Login;
