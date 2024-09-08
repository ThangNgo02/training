import React, { createContext } from 'react';

import { type IModalContext } from './types';

const initialModalContext: IModalContext = {
  data: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalContext = createContext(initialModalContext);

interface IModalProviderProps {
  children: React.ReactNode;
}
interface IStateModalContext {
  data: any;
}
const initialStateModalContext: IStateModalContext = {
  data: '',
};
function ModalProvider(props: IModalProviderProps) {
  const [state, setState] = React.useState<IStateModalContext>(initialStateModalContext);
  const value: IModalContext = React.useMemo(
    () => ({
      data: state.data,
    }),
    [state],
  );

  return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}

export default ModalProvider;
