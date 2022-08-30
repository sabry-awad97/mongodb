import { DependencyList, useEffect } from "react";

export const useComponentWillReceiveProps = (
  cb: () => void,
  deps: DependencyList
) => {
  useEffect(() => {
    cb();
  }, [deps]);
};
