import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

export function useLogin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    mutate: login,
    isPending: isLoggingIn,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      setErrorMessage(null);
      navigate("/", { replace: true });
    },
    onError: (err) => setErrorMessage(err.message),
  });

  return { login, isLoggingIn, isError, errorMessage };
}
