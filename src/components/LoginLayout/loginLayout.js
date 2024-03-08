import React from 'react'
import styles from "./css/loginLayout.module.css"
import FormLogin from './formLogin';
import { useLoginLayout } from './hooks/useLoginLayout';
import FormCreateNewAccount from './formCreateNewAccount';

const LoginLayout = () => {

    const {isCreateNewAccount, handleOnClickNewAccount, handleOnClickLogin} = useLoginLayout()

    return ( 
        <div className={styles.loginContainer}>
            <div className={styles.titleLogin}>
                <span>{isCreateNewAccount ? 'Crear FestiApp' : 'Entrar a FestiApp'}</span>
            </div>
            {isCreateNewAccount ? <FormCreateNewAccount /> : <FormLogin />}
            <div className={styles.createAccount}>
                {isCreateNewAccount ? <span onClick={handleOnClickLogin}>Ya tengo una cuenta</span> : <span onClick={handleOnClickNewAccount}>Crear nueva cuenta</span>}
                
            </div>
        </div>
     );
}
 
export default LoginLayout;