import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GENERAL_FEST } from "../gql/createGeneralFest.gql";

export const useModalAddCustomEvent = (props) => {
  const { onHide, refetchGetEvent } = props;

  const [base64Image, setBase64Image] = useState("");

  const [createEvent, { data, loading }] = useMutation(CREATE_GENERAL_FEST, {
    onCompleted: () => {
      onHide();
      refetchGetEvent();
    },
  });

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setBase64Image(base64);
    };

    reader.readAsDataURL(file);
  };

  const onSubmitNewEvent = async ({ values }) => {
    const { nameEvent, dateEvent, country } = values;

    const userID = localStorage.getItem("userID");

    const dateFormatt = dateEvent.replace(/-/g, "/");

    try {
      await createEvent({
        variables: {
          input: {
            contentType: "image/jpg",
            image: base64Image,
            initialDate: dateFormatt,
            isTicketMaster: false,
            name: nameEvent,
            userID: userID,
            country: country,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onSubmitNewEvent,
    handleFileInputChange,
  };
};
