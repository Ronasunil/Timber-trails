import { createContext, useContext, useEffect,  } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";


const DarkmodeContext = createContext();



export function DarkmodeProvider ({children}) {
    const {value: isDarkmode, setValue: setIsDarkmode} = useLocalStorageState('isDarkmode', false);

    const toggleDarkmode = function() {
        setIsDarkmode(value => !value);

    }

    useEffect(function() {
            if(isDarkmode) {
                document.documentElement.classList.add('dark-mode');
                document.documentElement.classList.remove('light-mode');
            }else{
                document.documentElement.classList.add('ligh-mode');
                document.documentElement.classList.remove('dark-mode');
            }
            
            
    },[isDarkmode])
    return <DarkmodeContext.Provider value={{isDarkmode, setIsDarkmode,toggleDarkmode}}>
                {children}
           </DarkmodeContext.Provider>
}


export function useDarkmode() {
    const context = useContext(DarkmodeContext);

    if(context === undefined) throw new Error('Context used outside the provider');

    return context;
}