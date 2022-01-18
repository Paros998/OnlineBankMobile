import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export const useFetchRawData = <T extends unknown>(endpoint: string, params?: any) => {
  const [rawData, setRawData] = useState<T>();
  const [isPending, setIsPending] = useState(false);
  const isFocused = useIsFocused();

  const fetchData = useCallback(async () => {
    setIsPending(true);
    try {
      const { data } = await axios.get<T>(endpoint, { params });
      setRawData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }, [setIsPending, setRawData, endpoint, params]);

  useEffect(() => {
    if (isFocused) {
      fetchData().catch();
    }
  }, [isFocused, fetchData]);

  return { rawData, fetchData, isPending };
};
