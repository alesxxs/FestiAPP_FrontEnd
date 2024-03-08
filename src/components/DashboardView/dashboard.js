import React, { Fragment } from "react";
import styles from "./css/dashboardView.module.css";
import DashboarLayout from "../DashboardLayout/dashboardLayout";

const DashboardView = () => {
  return (
    <Fragment>
      <div className={styles.dashboardPosition}>
        <DashboarLayout />
      </div>
    </Fragment>
  );
};

export default DashboardView;
