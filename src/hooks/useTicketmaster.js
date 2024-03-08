import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GENERAL_FEST } from "@/components/ModalAddEvent/gql/createGeneralFest.gql";

export const useTicketmaster = (props) => {
  const { onHide, refetchGetEvent } = props;

  const [createTicketMasterEvent, { data, loading }] =
    useMutation(CREATE_GENERAL_FEST, {
      onCompleted: () => {
        onHide();
        refetchGetEvent();
      }
    });

  const [nameEvent, setNameEvent] = useState();
  const [country, setCountry] = useState();
  const [ticketmasterEvents, setTicketmasterEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonTouched, setIsButtonTouched] = useState(false);

  useEffect(() => {
    const apiKey = "rqYwAMTOcxcRIuYryZnenQwjFAVghUZn";
    const URL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${nameEvent}&countryCode=${country}&apikey=${apiKey}`;

    const getEvents = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        if (data._embedded.events) {
          setTicketmasterEvents(data._embedded.events);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setCountry("");
      setNameEvent("");
    };

    if (country && nameEvent) {
      getEvents();
      setIsLoading(false);
    }
  }, [nameEvent, country]);

  const onSubmitSearchEvent = ({ values }) => {
    const { nameEvent, country } = values;

    if (nameEvent && country) {
      setIsButtonTouched(true);
      setIsLoading(true);
      setTicketmasterEvents(null);
      setCountry(country);
      setNameEvent(nameEvent);
    }
  };

  const addTicketMasterEvent = async (tmEvent) => {

    if (tmEvent) {
      try {
        const userID = localStorage.getItem("userID");

        if (userID) {
          await createTicketMasterEvent({
            variables: {
              input: {
                contentType: "image/jpg",
                image: tmEvent?.images[0].url,
                initialDate: tmEvent?.dates?.start?.localDate,
                isTicketMaster: true,
                name: tmEvent?.name,
                userID: userID,
                country: tmEvent?._embedded.venues[0].state.name
              },
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    onSubmitSearchEvent,
    ticketmasterEvents,
    country,
    isLoading,
    setIsLoading,
    isButtonTouched,
    setTicketmasterEvents,
    setIsButtonTouched,
    addTicketMasterEvent,
    loading,
    data
  };
};
