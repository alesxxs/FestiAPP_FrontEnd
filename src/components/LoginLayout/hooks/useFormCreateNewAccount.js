import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_ACCOUNT, AUTHENTICATE_USER } from "../gql/loginAndCreateNewUser.gql";
import { regexToEmails } from "../../../helpers/regexs";
import { useRouter } from "next/router";

export const useFormCreateNewAccount = () => {

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [firstPass, setFirstPass] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const [isSamePass, setIsSamePass] = useState(false);

  const [createNewUser, { data, loading }] = useMutation(CREATE_NEW_ACCOUNT);
  const [authenticateLogin, { data: dataAuth, loading: loadAuth }] = useMutation(AUTHENTICATE_USER);


  useEffect(() => {
    if (firstPass?.length > 8 && secondPass?.length > 8) {
      if (firstPass == secondPass) {
        setIsSamePass(true);
        setErrorMessage("");
      } else {
        setIsSamePass(false);
        setErrorMessage("Las contraseñas no son iguales");
      }
    } else {
      setIsSamePass(false);
      setErrorMessage("Ambas contraseñas deben tener más de 8 digitos");
    }
  }, [firstPass, secondPass]);

  useEffect(() => {
    if (dataAuth) {
      localStorage.setItem(
        "token_festiapp_signin",
        dataAuth.authenticateUser.token
      );

      router.push("/dashboard");
    }
  }, [dataAuth]);

  const handleSubmitFormCreate = async ({ values }) => {
    const { email, password, name } = values;

    if (regexToEmails(email) && isSamePass && name) {
      try {
        await createNewUser({
          variables: {
            input: {
              email: email,
              name: name,
              password: password,
            },
          }
        });

        await authenticateLogin({
          variables: {
            input: {
              email: email,
              password: password,
            },
          }
        })        
      } catch (error) {
        console.error(error);
      }
    } else {
      if (!isSamePass) {
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setErrorMessage("Las contraseñas no son iguales");
      }

      if (!regexToEmails(email)) {
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setErrorMessage("Favor de ingresar un correo valido.");
      }
    }
  };

  return {
    handleSubmitFormCreate,
    errorMessage,
    setFirstPass,
    setSecondPass,
    loading,
    loadAuth
  };
};
