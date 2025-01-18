import React from 'react';

function useKeydown(key, callback) {
  React.useEffect(() => {
    function dismissAll(e) {
      if (e.code === key) {
        callback();
      }
    }
    window.addEventListener('keydown', dismissAll);

    return () => window.removeEventListener('keydown', dismissAll);
  }, [key, callback]);
}

export default useKeydown;
