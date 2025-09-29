import { useCallback, useEffect, useState } from "react";

export interface Pokemon {
  name: string;
  url: string;
}

export default function usePokemon() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      if (!res.ok) throw new Error("Error al cargar datos");
      const json = await res.json();
      setData(json.results);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return { data, loading, error, refreshing, onRefresh };
}
