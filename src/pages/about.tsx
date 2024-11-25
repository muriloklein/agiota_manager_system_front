import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/about.module.css";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>Sobre - Agiota Manager System</title>
        <meta
          name="description"
          content="Sobre o desenvolvedor do Agiota Manager System"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className={styles.pageContainer}>
          <h1 className={styles.title}>Sobre Mim</h1>
          <div className={styles.content}>
            <p>
              <strong>Nome:</strong> Murilo Kaemmerer Klein
            </p>
            <p>
              <strong>Email:</strong> 199121@upf.br
            </p>
            <p className={styles.description}>
              Meu nome é Murilo, tenho 19 anos e sou estudante de Ciência da
              Computação na Universidade de Passo Fundo, atualmente curso o
              quarto nível da graduação. Além disso, atuo como Desenvolvedor de
              Sistemas Júnior na Congregação de Nossa Senhora - Notre Dame, onde
              contribuo para o desenvolvimento de projetos.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default About;
