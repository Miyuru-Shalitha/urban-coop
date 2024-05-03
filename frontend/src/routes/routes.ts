import { NavigateFunction } from "react-router-dom";

// FOR ROTUES

////////////////////////////////////////////////////////////////
const handleAdminRouteNavigation = (
  role: string,
  navigate: NavigateFunction
) => {
  switch (role) {
    // case "Dary Care Manager":
    //   navigate("/admin/day-care-management");
    //   break;
    case "Event Manager":
      navigate("/admin/event-dashboard");
      break;
    case "Supplier Manager":
      navigate("/admin/supplier-management");
      break;
    case "Inventory Manager":
    navigate("/admin/inventory-management");
    break;
    // case "Feedback Manager":
    //   navigate("/admin/feedback-management");
    //   break;
    // case "Adoption Manager":
    //   navigate("/admin/event-management");
    //   break;
    // case "Finance Manager":
    //   navigate("/admin/finanace-management");
    //   break;
    case "Employee Manager":
      navigate("/admin/employee-management");
      break;
  }
};

export { handleAdminRouteNavigation };
