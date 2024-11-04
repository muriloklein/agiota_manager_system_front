import React from "react";
import RandomImage from "../components/image";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/image.module.css";
import Head from "next/head";

const Image = () => {
  return (
    <>
      <Head>
        <title>Agiota Manager System</title>
        <meta name="description" content="Agiota Manager System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className={styles.pageContainer}>
          <h1 className={styles.title}>Imagem Aleatória</h1>
          <RandomImage />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Image;
