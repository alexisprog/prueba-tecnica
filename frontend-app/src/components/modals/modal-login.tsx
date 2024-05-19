/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BodyLogin } from "../../models/auth";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../../store/slices/user.slice";
import { login } from "../../services/auth.services";
import {
  HiOutlineArrowRight,
  HiMail,
  HiInformationCircle,
} from "react-icons/hi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  userlogin: yup
    .string()
    .required("El nombre de usuario o correo es requerido"),
});

const ModalLogin: React.FC<ModalProps> = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);

  const handleLogin = async (body: BodyLogin) => {
    try {
      dispatch(fetchUserStart());
      const data = await login(body);
      dispatch(fetchUserSuccess(data));
      onClose();
    } catch (error: any) {
      if (error?.response?.data?.error) {
        dispatch(fetchUserFailure(error?.response?.data?.error));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      userlogin: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values as BodyLogin);
      formik.resetForm();
    },
  });

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Inicia sesión en nuestra plataforma
            </h3>
            {error ? (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error!</span> {error}
              </Alert>
            ) : null}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userlogin" value="Usuario o correo" />
              </div>
              <TextInput
                id="userlogin"
                placeholder="name@company.com"
                value={formik.values.userlogin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                icon={HiMail}
                color={
                  formik.touched.userlogin && formik.errors.userlogin
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.userlogin && formik.errors.userlogin ? (
                    <>
                      <span className="font-medium">Oops!</span>{" "}
                      {formik.errors.userlogin}
                    </>
                  ) : null
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone="purpleToBlue"
            disabled={loading}
            type="submit"
            className="w-full"
          >
            Ingresar
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalLogin;
