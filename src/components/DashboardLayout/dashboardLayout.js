import React, { Fragment, useMemo } from "react";
import styles from "./css/dashboardLayout.module.css";
import { useDashboardLayout } from "./hooks/useDashboardLayout";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import ModalAddEvent from "../ModalAddEvent/modalAddEvent";
import ModalAddCustomEvent from "../ModalAddCustomEvent/modalAddCustomEvent";

const DashboarLayout = () => {
  const { data, showModal, handleCloseModal, handleShowModal, refetch, handleCloseModalCustom, handleShowModalCustom, showModalCustom } = useDashboardLayout();

  const eventsMap = useMemo(() => {
    const mapEvent = data?.getGeneralFest.map((event) => {
      const date = new Date(parseInt(event.initialDate));
  
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      return (
        <div className={styles.containerAllEvents}>
          <div className={styles.imageContainer}>
            <Image
              src={event?.image}
              width={300}
              height={200}
              alt="Festival Image"
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <span>Festival: </span>
              <span className={styles.secondSpan}>{`${event.name}`}</span>
            </div>
            <div className={styles.dateContainer}>
              <span>Fecha:</span>
  
              <span
                className={styles.secondSpanDate}
              >{`${day}/${month}/${year}`}</span>
            </div>
            <div className={styles.countryContainer}>
              <span>País/Estado: </span>
              <span
                className={styles.secondSpanCountry}
              >{`${event.country}`}</span>
            </div>
          </div>
        </div>
      );
    });

    return mapEvent
  }, [data?.getGeneralFest.length, refetch])

  return (
    <Fragment>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashTitleContainer}>
          <span>Próximos eventos</span>
          <Button variant="success" onClick={handleShowModal}>
            Agregar evento de TM
          </Button>
          <Button variant="success" onClick={handleShowModalCustom}>
            Agregar evento
          </Button>
        </div>

        <div className={styles.eventsContainer}>
          {data?.getGeneralFest ? eventsMap : null}
        </div>
      </div>
      <ModalAddEvent show={showModal} onHide={handleCloseModal} refetchGetEvent={refetch} />
      <ModalAddCustomEvent show={showModalCustom} onHide={handleCloseModalCustom} refetchGetEvent={refetch} />
    </Fragment>
  );
};

export default DashboarLayout;
