import React from 'react';
import AuthorizedViews from "./AuthorizedViews/AuthorizedViews";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import UnauthorizedViews from "./UnauthorizedViews/UnauthorizedViews";
import CenteredSpinner from "../components/CenteredSpinner/CenteredSpinner";
import { View } from "native-base";

const Views = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) {
    return (
      <View h='full'>
        <CenteredSpinner
          isPending={isPending}
          color='primary.500'
          size='lg'
        />
      </View>
    );
  }

  if (currentUser) {
    return <AuthorizedViews/>
  }

  return <UnauthorizedViews/>;
};

export default Views;
