import React from 'react'
import { Form } from "informed";
import CustomInput from "../CustomInput/customInput";
import { Button, Spinner } from "react-bootstrap";
import styles from "./css/loginLayout.module.css"
import { useFormCreateNewAccount } from "./hooks/useFormCreateNewAccount";

const FormCreateNewAccount = () => {
    const {handleSubmitFormCreate, errorMessage, setFirstPass,
      setSecondPass, loading, loadAuth} = useFormCreateNewAccount()

    return (
      <div className={styles.formLogin}>
        <Form onSubmit={handleSubmitFormCreate}>
        <div className={styles.inputsContainerNewAccount}>
            <CustomInput
              name={"name"}
              id={"name"}
              type={"text"}
              textLabel={"Nombre"}
            />
          </div>
          <div className={styles.inputsContainerNewAccount}>
            <CustomInput
              name={"email"}
              id={"email"}
              type={"email"}
              textLabel={"Correo electronico"}
            />
          </div>
          <div className={styles.inputsContainerNewAccount}>
            <CustomInput
              name={"password"}
              id={"password"}
              type={"password"}
              textLabel={"Contraseña"}
              onChange={(e) => setFirstPass(e.value)}
            />
          </div>
          <div className={styles.inputsContainerNewAccount}>
            <CustomInput
              name={"confirmPassword"}
              id={"confirmPassword"}
              type={"password"}
              textLabel={"Confirmar contraseña"}
              onChange={(e) => setSecondPass(e.value)}
            />
          </div>
          <div className={styles.error}>
              <span>{errorMessage ? errorMessage : null}</span>
          </div>
          <div className={styles.buttonContainerNewAccount}>
          {loading || loadAuth ? (
            <Spinner />
          ) : (
            <Button variant="light" type={"submit"}>
              Enviar
            </Button>
          )}
          </div>
        </Form>
      </div>
    );
}
 
export default FormCreateNewAccount;