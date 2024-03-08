import React from 'react'
import styles from "./css/loginView.module.css"
import LoginLayout from '../LoginLayout/loginLayout';

const LoginView = () => {
    return ( 
        <div className={styles.loginPosition}>
            <LoginLayout />
        </div>
     );
}
 
export default LoginView;