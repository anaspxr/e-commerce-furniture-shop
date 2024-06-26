import * as yup from "yup";

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
// min 6 characters, at least one uppercase letter, one lowercase letter, and one number

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email..")
    .required("Required"),
  password: yup
    .string()
    .min(6)
    .matches(passRegex, {
      message:
        "Minimum 6 characters, at least one uppercase letter, one lowercase letter, and one number",
    })
    .required("Required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const addressSchema = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  pincode: yup.string().length(6, "Enter a valid pin").required("Required"),
  phone: yup
    .string()
    .min(7, "Enter a valid Phone Number.")
    .required("Required"),
});
