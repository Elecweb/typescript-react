import React, { FC, useEffect, useState } from "react";
import {
  Content,
  View,
  Text,
  ListBox,
  Item,
  Heading,
  Flex,
  Button,
} from "@adobe/react-spectrum";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { useDatabase } from "../../FirebaseProvider";
import { Employee } from "../../models/Employee";

const List: FC<RouteComponentProps> = () => {
  const database = useDatabase();
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const navigate = useNavigate();

  const fetch = () => {
    if (!database) {
      return;
    }

    return database.getEmployeeList().then((employeeList) => {
      setEmployeeList(
        Object.keys(employeeList ?? {}).map((key) => {
          return {
            ...employeeList[key],
            id: key,
          };
        })
      );
    });
  };

  useEffect(() => {
    fetch();
  }, [database]);

  return (
    <Content>
      <View maxWidth="size-6000" marginX="auto">
        <Flex justifyContent="end" marginBottom="size-200">
          <Button
            variant="cta"
            onPress={() => {
              navigate("/create");
            }}
          >
            Create
          </Button>
        </Flex>
      </View>
      <View
        maxWidth="size-6000"
        marginX="auto"
        borderColor="dark"
        borderRadius="medium"
        borderWidth="thin"
        padding="size-150"
      >
        <Flex
          UNSAFE_style={{
            flexDirection: "column",
          }}
        >
          {employeeList.length > 0 ? (
            employeeList.map((employee) => (
              <Flex
                key={employee.id}
                UNSAFE_style={{
                  flexDirection: "column",
                }}
                marginBottom="size-300"
              >
                <Flex justifyContent="space-between" gridArea="text">
                  <Text
                    UNSAFE_style={{
                      fontWeight: "bold",
                    }}
                  >
                    {employee.name} {employee.lastname}
                  </Text>
                  <Text>age {employee.age}</Text>
                </Flex>
                <Flex
                  gridArea="description"
                  UNSAFE_style={{
                    flexWrap: "wrap",
                  }}
                >
                  <Text marginTop="size-150" gridArea="text" flex="1 0 100%">
                    {employee.description}
                  </Text>
                  <Flex marginTop="size-200">
                    <Button
                      variant="primary"
                      marginEnd="size-100"
                      onPress={() => {
                        navigate("/edit/" + employee.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="negative"
                      onPress={() => {
                        database?.deleteEmployee(employee.id);
                        fetch();
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ))
          ) : (
            <Flex justifyContent="center">
              <Text>No Employee</Text>
            </Flex>
          )}
        </Flex>
      </View>
    </Content>
  );
};

export default List;
