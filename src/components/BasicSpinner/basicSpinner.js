import React from "react";
import styles from "./css/basicSpinner.module.css";
import { Spinner } from "react-bootstrap";

const BasicSpinner = () => {
  return (
    <div className={styles.spinnerGeneral}>
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default BasicSpinner;
