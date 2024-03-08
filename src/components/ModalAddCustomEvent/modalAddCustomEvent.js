import React, { Fragment } from "react";
import { Form } from "informed";
import { Button, Modal } from "react-bootstrap";
import CustomInput from "../CustomInput/customInput";
import CustomSelectCountries from "../CustomSelectCountries/customSelectCountries";
import styles from "./css/modalAddCustomEvent.module.css";
import { useModalAddCustomEvent } from "./hooks/useModalAddCustomEvent";

const ModalAddCustomEvent = (props) => {
  const { onHide, refetchGetEvent } = props;

  const { onSubmitNewEvent, handleFileInputChange } = useModalAddCustomEvent({
    onHide,
    refetchGetEvent
  });

  return (
    <Modal
      {...props}
      //   show={showModal}
      onExit={() => {
        // setIsButtonTouched(false);
        // setTicketmasterEvents(null);
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
        <Form onSubmit={onSubmitNewEvent}>
          <div>
            <CustomInput textLabel={"Nombre del Evento:"} name={"nameEvent"} />
          </div>
          <div className={styles.spaceBetweenInputs}>
            <CustomInput
              textLabel={"Fecha del Evento:"}
              name={"dateEvent"}
              type={"date"}
            />
          </div>
          <div className={styles.spaceBetweenInputs}>
            <CustomInput
              textLabel={"Imagen del Evento:"}
              name={"imageEvent"}
              type={"file"}
              getFile={(e) => handleFileInputChange(e)}
              accept="image/*"
            />
          </div>
          <div className={styles.spaceBetweenInputs}>
            <CustomSelectCountries
              textLabel={"País:"}
              name={"country"}
              isCustomEvent={true}
            />
          </div>

          <div className={styles.divButtonSearch}>
            <Button
              variant="success"
              type="submit"
              className={styles.buttonSearch}
            >
              Agregar Evento
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddCustomEvent;
