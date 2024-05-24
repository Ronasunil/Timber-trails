import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  // prettier-ignore
  const { mutate: signup, isPending: isSigning, isError } = useMutation({
    mutationFn: (user) => signupApi(user),
    onSuccess:() => toast.success('User successfully created signup to verify')
  });

  return { signup, isSigning, isError };
}
