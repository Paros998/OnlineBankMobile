import React from 'react';

import Home from "./Home/Home";
import Payments from "./Payments/Payments";
import Transfers from "./Payments/Transfers";


const AuthorizedViews = () => {
  return (
    <>
      <Stack.Screen name="Payments" component={Payments}/>
      <Stack.Screen name="HomePage" component={Home}/>
      <Stack.Screen name="Transfers" component={Transfers}/>
    </>
  );
};

export default AuthorizedViews;
