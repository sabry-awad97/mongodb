import { useEffect } from "react";

export const useComponentWillUnmount = (cleanup: () => void) => {
  useEffect(() => () => cleanup());
};
