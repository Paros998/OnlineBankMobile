import React from 'react';
import AuthorizedViews from "./AuthorizedViews/AuthorizedViews";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import UnauthorizedViews from "./UnauthorizedViews/UnauthorizedViews";
import ScreenPending from "../components/ScreenPending/ScreenPending";

const Views = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) {
    return <ScreenPending isPending={isPending} />;
  }

  if (currentUser) {
    return <AuthorizedViews/>
  }

  return <UnauthorizedViews/>;
};

export default Views;
