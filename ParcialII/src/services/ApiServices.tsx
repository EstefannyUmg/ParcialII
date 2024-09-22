import { useEffect, useState } from "react";

//Parámetros utilizados
interface iParametros {
  sId: string;
  onResult: (data: {
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
  }) => void;
}

//Inicio de la funsión
function ApiServices({ sId, onResult }: iParametros) {
//Constantes que se declaran estaticas para luego ser llenadas.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//Inicio de useEffect que se encarga del consumo de la API 
  useEffect(() => {
    if (!sId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

//En esta parte se llama la API y se le envía el parametro para que busque desde un inicio.
const response = await fetch(`https://api.vercel.app/blog/${sId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

//Validación si es diferente a la respuesta que se espera.
        if (!response.ok) {
          throw new Error("No se pudo acceder al contenido de la API.");
        }

        const data = await response.json();
        console.log(data);
        const respLib = data[0];
        if (respLib) {
          onResult(respLib);
        } else {
          setError("No se encontrarón datos.");
        }
      }  finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sId, onResult]);

  if (loading) {
    return <p>Cargando los datos...</p>;
  }

  if (error) {
    return <p>Ocurrio un error: {error}</p>;
  }

  return null;
}

export default ApiServices;
