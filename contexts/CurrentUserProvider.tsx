import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CurrentUserContextModel } from "../interfaces/CurrentUserContextModel";
import { ClientModel } from "../interfaces/ClientModel";
import jwtDecode from "jwt-decode";
import { TokenData } from "../interfaces/TokenData";
import axios from "axios";
import { getRawToken } from "../utils/getRawToken";
import { deleteToken } from "../utils/deleteToken";
import { useToast } from "native-base";

const CurrentUserContext = createContext<CurrentUserContextModel | undefined>(undefined);

interface CurrentUserProviderProps {
  children: ReactNode;
}

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<ClientModel>();
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const fetchUser = useCallback(async () => {
    setIsPending(true);

    const token = await getRawToken();

    if (!token){
      setIsPending(false);
      return;
    }

    const decodedToken: TokenData = jwtDecode(token);

    try {
      const { data } = await axios.get<ClientModel>(`/clients/${decodedToken.userId}`);
      setCurrentUser(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }, [setIsPending, setCurrentUser]);

  useEffect(() => {
    fetchUser().catch();
  }, [setCurrentUser, fetchUser]);

  const handleLogout = async () => {
    await deleteToken();
    await fetchUser();
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(undefined);
    toast.show({
      title: 'Dziękujemy za skorzystanie z naszych usług',
      status: 'info',
    });
  };

  return { fetchUser, currentUser, isPending, handleLogout };
};

export const useCurrentUser = () => useContext(CurrentUserContext) as CurrentUserContextModel;

const CurrentUserProvider: FC<CurrentUserProviderProps> = ({ children }) => {
  const currentUserData = useFetchCurrentUser();
  return (
    <CurrentUserContext.Provider value={currentUserData}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
