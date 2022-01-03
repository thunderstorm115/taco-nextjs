import React from 'react';
import { saveToSessionStorage, loadFromSessionStorage } from '__helpers__/sessionStorage';
import Reducer from './trialReducer';

let initialState={
    email: '',
    passwor: '',
    companyName: '',
    companyRegNo: '',
    companyVatNo: '',
    hostingEnvironment: '',
    tcpCheck: false,
    os: 'Redhat',
    osVersion: '',
    ipAddress: '',
    hostname: '',
    tcpPort: '',
    winRMUsername: '',
    winRMPassword: '',
    SSHUsername: '',
    SSHPassword: '',
    publicKey: '',
    sudoPassword: '',
    sudoOptions: '',
    rootPassword: ''
};

const Store = ({children}) => {
    const [state, dispatch] = React.useReducer(Reducer, initialState=loadFromSessionStorage('trial-signup', initialState));

    React.useEffect(() => {
        saveToSessionStorage('trial-signup',state)
    },[state]);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = React.createContext(initialState);

export default Store;