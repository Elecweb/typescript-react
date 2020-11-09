import React, { FC, useContext } from "react";
import {
  Content,
  Heading,
  View,
  TextField,
  Flex,
  Button,
  TextArea,
} from "@adobe/react-spectrum";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { useFormik } from "formik";
import { useDatabase } from "../../FirebaseProvider";

const Create: FC<RouteComponentProps> = () => {
  const database = useDatabase();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      age: "25",
      description: "",
    },
    onSubmit: (values) => {
      database
        ?.createEmployee(
          values.name,
          values.lastName,
          values.description,
          values.age
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
              Create
            </Button>
          </Flex>
        </View>
      </form>
    </Content>
  );
};

export default Create;
