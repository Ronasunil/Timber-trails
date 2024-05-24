import * as yup from "yup";

const cabinSchema = yup
  .object({
    name: yup.string().required("missing field cabin name"),
    minCapacity: yup
      .number()
      .typeError("price must be a number")
      .required("missing field minimum capacity")
      .min(1, "vlaue must be greater than 1"),
    maxCapacity: yup.number().when("minCapacity", (value, schema) => {
      return schema
        .required("missing field maximum capacity")
        .typeError("price must be a number")
        .min(
          value,
          "maximum capacity must be greater or equal to minimum capacity"
        );
    }),
    price: yup
      .number()
      .typeError("price must be a number")
      .required("missing field price")
      .min(1, "price must be greater than zero"),

    discount: yup
      .number()
      .typeError("price must be a number")
      .when("price", (value, schema) => {
        return schema.max(value, "discount must be less than price");
      }),

    description: yup.string().required("missing field description"),
  })
  .required();

export default cabinSchema;
