import React from 'react';
import useKeydown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = React.useState([]);

  const handleEscape = React.useCallback(() => setToastList([]), []);

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const newToast = { id: crypto.randomUUID(), message, variant };
    setToastList([...toastList, newToast]);
  }

  function deleteToast(deleteId) {
    const remainingToast = toastList.filter(({ id }) => id !== deleteId);
    setToastList(remainingToast);
  }

  return (
    <ToastContext.Provider
      value={{
        toastList,
        createToast,
        deleteToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
