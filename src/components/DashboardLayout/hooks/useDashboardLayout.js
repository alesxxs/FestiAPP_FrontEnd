import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_EVENTS } from "../gql/getEvents.gql";
import { GET_USER } from "../gql/getUser.gql";
import { useEffect, useState } from "react";

export const useDashboardLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCustom, setShowModalCustom] = useState(false);


  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModalCustom = () => setShowModalCustom(false);
  const handleShowModalCustom = () => setShowModalCustom(true);

  const token = localStorage.getItem("token_festiapp_signin");

  const { data: dataUser } = useQuery(GET_USER, {
    variables: {
      token: token,
    },
  });
  const [getEvents, { data, refetch }] = useLazyQuery(GET_EVENTS);

  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userID", dataUser.getUser.id);

      const userID = localStorage.getItem("userID");

      getEvents({
        variables: {
          getGeneralFestId: userID,
        },
      });
    }
  }, [dataUser]);

  return {
    data,
    showModal,
    handleCloseModal,
    handleShowModal,
    handleCloseModalCustom,
    handleShowModalCustom,
    showModalCustom,
    refetch
  };
};
