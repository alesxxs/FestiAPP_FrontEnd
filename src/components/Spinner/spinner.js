import React from "react";
import styles from "./css/spinner.module.css";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
  return (
    <div className={styles.spinnerGeneral}>
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
