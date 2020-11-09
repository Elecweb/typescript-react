import React, { FC, useContext, useEffect, useState } from "react";
import {
  Content,
  Heading,
  View,
  TextField,
  Flex,
  Button,
  TextArea,
} from "@adobe/react-spectrum";
import { RouteComponentProps, useNavigate, useMatch } from "@reach/router";
import { useFormik } from "formik";
import { useDatabase } from "../../FirebaseProvider";
import { Employee } from "../../models/Employee";

const Edit: FC<RouteComponentProps> = () => {
  const database = useDatabase();
  const navigate = useNavigate();
  const match = useMatch("/edit/:employee");

  const employeeId = match?.employee;

  const [employee, setEmployee] = useState<{
    name: string;
    lastName: string;
    age: string;
    description: string;
  }>({
    name: "",
    lastName: "",
    age: "",
    description: "",
  });

  useEffect(() => {
    if (!database) {
      return;
    }

    database.getEmployee(employeeId ?? "").then((employee) => {
      setEmployee({
        name: employee.name,
        lastName: employee.lastname,
        age: employee.age,
        description: employee.description,
      });
    });
  }, [database, employeeId]);

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    onSubmit: (values) => {
      database
        ?.editEmployee(
          match?.employee ?? "",
          values?.name ?? "",
          values?.lastName ?? "",
          values?.description ?? "",
          values?.age ?? ""
        )
        .then(() => {
          navigate("/");
        });
    },
  });

  return (
    <Content>
      <form onSubmit={formik.handleSubmit}>
        <View
          maxWidth="size-6000"
          marginX="auto"
          borderColor="dark"
          borderRadius="medium"
          borderWidth="thin"
          padding="size-200"
          paddingBottom="size-400"
        >
          <Heading>Creae employee</Heading>
          <Flex>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onInput={formik.handleChange}
            />
          </Flex>
          <Flex marginTop="size-200">
            <TextField
              name="lastName"
              label="Lastname"
              value={formik.values.lastName}
              onInput={formik.handleChange}
            />
          </Flex>
          <Flex marginTop="size-200">
            <TextField
              name="age"
              type="number"
              label="Age"
              value={`${formik.values.age}`}
              onInput={formik.handleChange}
            />
          </Flex>
          <Flex marginTop="size-200">
            <TextArea
              label="Description"
              name="description"
              value={formik.values.description}
              onInput={formik.handleChange}
            />
          </Flex>
          <Flex marginTop="size-200">
            <Button type="submit" variant="cta">
              Edit
            </Button>
          </Flex>
        </View>
      </form>
    </Content>
  );
};

export default Edit;
