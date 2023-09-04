import { useState, useEffect } from 'react';
import axios from 'axios';

// Pour bien faire il faudrait passer par une variable d'environnement
const rapidApiKey = 'c9e4ac9385mshfea2a1a700c1825p1e4a7ejsne895433d9b68';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // On utilise le code fourni par l'API mais on le dynamise
  // Grace à la variable "endpoint" que l'on passe en prop
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    // Je passe ma clé API grace à une variable d'environnement
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    // Toujours pour dynamiser, je passe une "query" aux paramètres
    // Pour effectuer la recherche sur les params qui m'intéressent
    params: { ...query },
  };

  const fetchData = async () => {
    // Quand on commence à chercher, le loading commence
    setIsLoading(true);

    try {
      const response = await axios.request
      (options);

      setData(response.data.data);
    } catch (error) {  
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  // Pour utiliser cette fonction qui va chercher les données
  // On la déclenche dans un useEffect
  useEffect(() => {
    fetchData();
  }, [])

  // Il a créé cette fonction car il avait des soucis si fetch à plusieurs reprises
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  // On renvoie tout ce dont on a besoin
  return { data, isLoading, error, refetch };
}