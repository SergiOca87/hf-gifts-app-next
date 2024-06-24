import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, themeSettings }) => {
    return (
        <ThemeContext.Provider value={themeSettings}>
            {children}
        </ThemeContext.Provider>
    );
};