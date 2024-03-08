import { Form } from "informed";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import { useTicketmaster } from "@/hooks/useTicketmaster";
import CustomSelectCountries from "../CustomSelectCountries/customSelectCountries";
import styles from "./css/modalAddEvent.module.css";
import Image from "next/image";
import SpinnerComponent from "../Spinner/spinner";

const ModalAddEvent = (props) => {
  const { onHide, refetchGetEvent } = props;

  const {
    onSubmitSearchEvent,
    ticketmasterEvents,
    isButtonTouched,
    setTicketmasterEvents,
    setIsButtonTouched,
    addTicketMasterEvent,
    loading
  } = useTicketmaster({ onHide, refetchGetEvent });

  const eventsMap = ticketmasterEvents?.map((tmEvent) => {
    if (
      !tmEvent.name.includes("Estacionamiento") &&
      !tmEvent.name.includes("Ticket2ride")
    ) {
      const time = tmEvent.dates.start.localTime;
      const timeSplitToFormatt = time?.split(":");
      const date = new Date(tmEvent?.dates?.start?.localDate);

      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        <div
          className={styles.containerAllEvents}
          onClick={() => addTicketMasterEvent(tmEvent)}
        >
          <div className={styles.imageContainer}>
            <Image
              src={tmEvent?.images[0].url}
              width={300}
              height={200}
              alt="Festival Image"
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <span>Evento: </span>
              <div className={styles.divTitleContainer}>
                <span className={styles.secondSpan}>{`${tmEvent.name}`}</span>
              </div>
            </div>
            <div className={styles.dateContainer}>
              <span>Fecha:</span>
              <div className={styles.divDateContainer}>
                <span
                  className={styles.secondSpanDate}
                >{`${day}/${month}/${year}`}</span>
              </div>
            </div>

            <div className={styles.dateContainer}>
              <span>Hora:</span>
              <div className={styles.divTimeContainer}>
                <span className={styles.secondSpanDate}>
                  {timeSplitToFormatt
                    ? timeSplitToFormatt[0] +
                      ":" +
                      timeSplitToFormatt[1] +
                      " hrs"
                    : "No hay hora definida"}
                </span>
              </div>
            </div>
            <div className={styles.dateContainer}>
              <span>Recinto:</span>
              <div className={styles.divTimeContainer}>
                <span className={styles.secondSpanDate}>
                  {tmEvent?._embedded.venues[0].name}
                </span>
              </div>
            </div>
            <div className={styles.dateContainer}>
              <span>País/Estado:</span>
              <div className={styles.divTimeContainer}>
                <span className={styles.secondSpanDate}>
                  {tmEvent?._embedded.venues[0].state.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <Modal
      {...props}
      //   show={showModal}
      onExit={() => {
        setIsButtonTouched(false);
        setTicketmasterEvents(null);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar evento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitSearchEvent}>
          <div>
            <CustomInput textLabel={"Nombre del Evento:"} name={"nameEvent"} />
          </div>
          <div className={styles.spaceBetweenInputs}>
            <CustomSelectCountries
              textLabel={"País:"}
              name={"country"}
            />
          </div>
          <div className={styles.divButtonSearch}>
            <Button
              variant="success"
              type="submit"
              className={styles.buttonSearch}
            >
              Buscar
            </Button>
          </div>
        </Form>
        {loading ? <SpinnerComponent /> : null}
        {isButtonTouched ? (
          eventsMap ? (
            eventsMap
          ) : (
            <div className={styles.containerAllEvents}>
              No hay ningún evento programado.
            </div>
          )
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddEvent;
