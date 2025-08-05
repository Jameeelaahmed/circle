import { useState } from "react";

export function useAutoDir() {
    const [dir, setDir] = useState("ltr");

    const handleAutoDir = (value) => {
        if (value.length === 0) {
            setDir("ltr");
        } else if (value.length === 1) {
            const firstChar = value.charAt(0);
            const isRTL = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(firstChar);
            setDir(isRTL ? "rtl" : "ltr");
        }
    };

    return { dir, handleAutoDir };
}
