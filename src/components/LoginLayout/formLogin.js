import React from "react";
import { Form } from "informed";
import CustomInput from "../CustomInput/customInput";
import { Button, Spinner } from "react-bootstrap";
import styles from "./css/loginLayout.module.css";
import { useFormLogin } from "./hooks/useFormLogin";

const FormLogin = () => {
  const { handleSubmitFormLogin, errorMessage, loading } = useFormLogin();

  return (
    <div className={styles.formLogin}>
      <Form onSubmit={handleSubmitFormLogin}>
        <div className={styles.inputsContainer}>
          <CustomInput
            name={"email"}
            id={"email"}
            type={"email"}
            textLabel={"Correo electronico"}
          />
        </div>
        <div className={styles.inputsContainer}>
          <CustomInput
            name={"password"}
            id={"password"}
            type={"password"}
            textLabel={"Contraseña"}
          />
        </div>
        <div className={styles.error}>
          <span>{errorMessage ? errorMessage : null}</span>
        </div>
        <div className={styles.buttonContainer}>
          {loading ? (
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
};

export default FormLogin;
