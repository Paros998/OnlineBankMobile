import * as Yup from "yup";
import {RequiredStringSchema} from "yup/lib/string";
import {AnyObject, Assign, ObjectShape} from "yup/lib/object";
import {FormikHelpers} from "formik";

export interface HelpPropsInterface{
  formikValues: UserEmail,
  validationSchema:  Yup.ObjectSchema<Assign<ObjectShape, {email: RequiredStringSchema<string | undefined, AnyObject>}>>,
  handleSubmit: (values: UserEmail, formikHelpers: FormikHelpers<UserEmail>) => void | Promise<any>
}