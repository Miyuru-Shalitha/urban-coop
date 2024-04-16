interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dateJoined: string;
  role: string;
}

const getEmployees = async () => {
  const employees: Employee[] = [
    {
      _id: "UB12345",
      firstName: "David",
      lastName: "Jones",
      email: "david@test.com",
      address: "Somewhere on the Earth",
      dateJoined: "02/04/2024",
      role: "Employee Manager",
    },
    {
      _id: "UB12346",
      firstName: "Emma",
      lastName: "Smith",
      email: "emma@test.com",
      address: "123 Main St",
      dateJoined: "03/15/2023",
      role: "Employee Manager",
    },
    {
      _id: "UB12347",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@test.com",
      address: "456 Elm St",
      dateJoined: "05/20/2022",
      role: "Employee Manager",
    },
    {
      _id: "UB12348",
      firstName: "Sophia",
      lastName: "Brown",
      email: "sophia@test.com",
      address: "789 Oak St",
      dateJoined: "11/10/2021",
      role: "Employee Manager",
    },
    {
      _id: "UB12349",
      firstName: "Ethan",
      lastName: "Wilson",
      email: "ethan@test.com",
      address: "1st Avenue",
      dateJoined: "09/08/2020",
      role: "Employee Manager",
    },
  ];

  return employees;
};

export { type Employee, getEmployees };
