import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://picsum.photos/id/237/400/600",
          {
            responseType: "blob",
          }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Erro ao buscar imagem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading)
    return <p className={styles.loadingText}>Carregando imagem...</p>;

  return (
    <div className={styles.imageContainer}>
      {imageUrl && (
        <img src={imageUrl} alt="Imagem aleatória" className={styles.image} />
      )}
    </div>
  );
};

export default RandomImage;
