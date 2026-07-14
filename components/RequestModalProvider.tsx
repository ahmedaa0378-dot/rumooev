'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { RequestModal } from './RequestModal';

type Prefill = Record<string, string> | undefined;

type RequestModalContextValue = {
  open: (prefill?: Prefill) => void;
  close: () => void;
  isOpen: boolean;
};

const RequestModalContext = createContext<RequestModalContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useRequestModal() {
  return useContext(RequestModalContext);
}

export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>(undefined);

  const open = useCallback((p?: Prefill) => {
    setPrefill(p);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <RequestModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <RequestModal isOpen={isOpen} onClose={close} initialValues={prefill} />
    </RequestModalContext.Provider>
  );
}
