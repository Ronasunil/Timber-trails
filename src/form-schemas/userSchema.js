import * as yup from "yup";

const userSchema = yup
  .object({
    fullname: yup
      .string()
      .required("Fullname is required")
      .min(3, "fullname atleast need 3 words"),
    email: yup.string().required("Email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password msut need 8 characters with 1 uppercase, lowercase, special character and number"
      ),
    confirmPassword: yup
      .string()
      .required("This field is required")
      .oneOf([yup.ref("password"), null], "Password must match"),
  })
  .required();

export default userSchema;
