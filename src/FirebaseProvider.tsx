import firebase from "firebase/app";
import "firebase/database";
import React, {
  FC,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Employee, EmployeeList } from "./models/Employee";

const firebaseConfig = {
  databaseURL: "https://react-typescript-9ffe6.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

interface FirebaseContextInterface {
  getEmployeeList: () => Promise<Record<string, Employee>>;
  getEmployee: (id: string) => Promise<Employee>;
  createEmployee: (
    name: string,
    lastName: string,
    description: string,
    age: string
  ) => Promise<any>;
  editEmployee: (
    id: string,
    name: string,
    lastName: string,
    description: string,
    age: string
  ) => Promise<any>;
  deleteEmployee: (id: string) => Promise<any>;
}

const FirebaseContext = createContext<FirebaseContextInterface | null>(null);

const database = firebase.database();

export const useDatabase = () => {
  const value = useContext(FirebaseContext);
  return value;
};

const FirebaseProvider: FC = ({ children }) => {
  const createEmployee = useCallback(
    (name: string, lastName: string, description: string, age: string) => {
      const ref = database.ref("/employee");

      const newPostRef = ref.push();
      return newPostRef.set({
        name,
        lastname: lastName,
        age,
        description,
      });
    },
    [database]
  );

  const editEmployee = useCallback(
    (
      id: string,
      name: string,
      lastName: string,
      description: string,
      age: string
    ) => {
      const ref = database.ref("/employee/" + id);

      return ref.set({
        name,
        lastname: lastName,
        age,
        description,
      });
    },
    [database]
  );

  const getEmployeeList = useCallback(() => {
    const ref = database.ref("/employee");
    return ref.once("value").then((snapshot) => {
      return snapshot.val();
    });
  }, [database]);

  const getEmployee = useCallback(
    (id: string) => {
      const ref = database.ref("/employee/" + id);
      return ref.once("value").then((snapshot) => {
        return snapshot.val();
      });
    },
    [database]
  );

  const deleteEmployee = useCallback((id: string) => {
    const ref = database.ref("/employee/" + id);
    return ref.remove();
  }, []);

  const value = useMemo(() => {
    return {
      createEmployee,
      getEmployeeList,
      getEmployee,
      editEmployee,
      deleteEmployee,
    };
  }, [createEmployee, getEmployeeList, getEmployee, editEmployee]);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
