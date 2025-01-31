import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClickOutsideModal(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener(
        "click",
        handleClickOutsideModal,
        listenCapturing
      );

      return () =>
        document.removeEventListener(
          "click",
          handleClickOutsideModal,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
}
