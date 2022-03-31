import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppConfigContext = createContext(undefined);

const AppDataProvider = ({children}: {children: React.ReactNode}) => {
    const [appConfig, setAppConfig] = useState();

    useEffect(() => {
        const getAppConfig = async () => {
            // Get App Name from subdomain
            const host = window.location.host.split('.');
            const APP_NAME = host[0];
            console.log(APP_NAME);
            const res = await axios.get(`https://api.staging.prestocolor.online/v1//app/getApp/${APP_NAME}`);
            console.log(res);
        }

        getAppConfig();
    }, []);

    return (
        <AppConfigContext.Provider value={appConfig}>
            {children}
        </AppConfigContext.Provider>
    );
}

export function useAppConfig() {
    const context = useContext(AppConfigContext);

    if (!context) throw new Error('useAppConfig must be used inside a `AppConfigProvider`');

    return context;
}

export default AppDataProvider