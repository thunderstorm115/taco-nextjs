import React, { createContext } from 'react';
import Pool from '../../../../obs-cocoa-react/src/UserPoolAmplify';
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';

const AccountContext = createContext();
Amplify.configure({Auth: Pool});

const Account = props => {
    const getSession = async() => 
    await new Promise((resolve, reject) => {
        const user = Pool.getCurrentUser();
        if(user){
            user.getSession(async (err, session) => {
                if(err){
                    reject();
                } else {
                    const attributes = await new Promise((resolve, reject) =>{
                        user.getUserAttributes((err, attributes) =>{
                            if(err){
                                reject(err);
                            }else{
                                const results = {};
                                for (let attribute of attributes) {
                                    const {Name, Value} = attribute;
                                    results[Name] = Value;
                                }
                                 resolve(results);
                            }
                        });
                    });

                    const token = session.getIdToken().getJwtToken()
                    
                    resolve({
                        headers: {
                            "Authorization": "Bearer " + token,
                          },
                        user,
                        ...session,
                        ...attributes
                    });
                ;}  
            });
        } else {reject();}
    });

        const authenticate = async (Username, Password) =>
        await new Promise((resolve, reject) => {
            const authDetails = Auth.signIn(Username, Password);
                if(authDetails){
                    authDetails.then((data)=> {
                        resolve(data);
                        history.push('/dashboard');
                    }).catch(err => {
                        reject(err);
                    })
                }       
            });
            
        const history = useHistory();
         const logout = async () => {
                    try {
                        await Auth.signOut();
                        history.push('/login');
                     } catch (error) {
                         console.log('error signing out: ', error);
                     }
        }

        
    return(
        <AccountContext.Provider value={{
                authenticate,
                getSession,
                logout
            }}>
                {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };