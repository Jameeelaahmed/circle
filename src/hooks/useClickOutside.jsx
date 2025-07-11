import { useEffect, useRef } from "react";

export default function useClickOutside({ state, setState }) {
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutisde(e) {
            if (ref.current && state && !ref.current.contains(e.target)) {
                setState(false);
            }
        }
        document.addEventListener("click", handleClickOutisde, true);

        return () =>
            document.removeEventListener("click", handleClickOutisde, true);
    }, [state]);

    return ref;
}
