import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type SidebarProviderProps = {
    children: ReactNode;
};

type SidebarContextType = {
    isLargeOpen: boolean;
    isSmallOpen: boolean;
    toggle: () => void;
    close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
    const value = useContext(SidebarContext);
    if (value == null) throw Error("Cannot use outside of SidebarPorivider");

    return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);
    useEffect(() => {
        const handler = () => {
            if (!isSreenSmall()) setIsSmallOpen(false);
        };

        window.addEventListener("resize", handler);

        return ()=> {
            window.removeEventListener("resize", handler);
        }
    }, []);

    function isSreenSmall() {
        return window.innerWidth < 1024;
    }

    function toggle() {
        if (isSreenSmall()) {
            setIsSmallOpen((s) => !s);
        } else {
            setIsLargeOpen((l) => !l);
        }
    }

    function close() {
        if (isSreenSmall()) {
            setIsSmallOpen(false);
        } else {
            setIsLargeOpen(false);
        }
    }
    return (
        <SidebarContext.Provider
            value={{
                isLargeOpen,
                isSmallOpen,
                toggle,
                close,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
