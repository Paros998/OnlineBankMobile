import React, { FC } from "react";
import { Center, ISpinnerProps, Spinner } from "native-base";

interface CenteredSpinnerProps extends ISpinnerProps {
  isPending: unknown;
}

const CenteredSpinner: FC<CenteredSpinnerProps> = ({ isPending, ...props }) => {
  if (isPending) {
    return (
      <Center h='full'>
        <Spinner {...props} />
      </Center>
    );
  }

  return null;
};

export default CenteredSpinner;
