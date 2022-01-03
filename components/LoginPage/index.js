import React from 'react';
import { Account } from './Accounts';
import Login from './Login';
import "../../../../obs-cocoa-react/src/index.scss";

export default () => {
    return (
        <div>
            <Account>
                <Login /> 
            </Account>
        </div>
    )
}