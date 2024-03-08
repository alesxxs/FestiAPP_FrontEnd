import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { regexToEmails } from "../../../helpers/regexs";
import { AUTHENTICATE_USER } from "../gql/loginAndCreateNewUser.gql";
import { useRouter } from "next/router";

export const useFormLogin = () => {
  const router = useRouter();

  const [authenticateLogin, { data, loading }] = useMutation(AUTHENTICATE_USER);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "token_festiapp_signin",
        data.authenticateUser.token
      );

      router.push("/dashboard");
    }
  }, [data]);

  const handleSubmitFormLogin = async ({ values }) => {
    const { email, password } = values;

    if (!regexToEmails(email)) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setErrorMessage("Favor de ingresar un correo valido.");
    } else {
      if ((email && password) || regexToEmails(email)) {
        try {
          await authenticateLogin({
            variables: {
              input: {
                email: email,
                password: password,
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setErrorMessage("Favor de llenar todos los campos requeridos.");
      }
    }
  };

  return {
    handleSubmitFormLogin,
    errorMessage,
    loading
  };
};
