import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import LOGO from "../assets/logo.webp";
import { USER_ROLES } from "../constants/roles";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "../store/useFeedbackStore";
import AddFeedbackModal from "../pages/feedback/AddFeedbackModal";

const NavBar = () => {
  const navigate = useNavigate();
  //
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user,
  }));
  //
  const { openAddFeedbackModal } = useFeedbackStore((state) => ({
    openAddFeedbackModal: state.openAddFeedbackModal,
  }));
  //
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#E5A700" }}
    >
      {user && user.role === USER_ROLES.CUSTOMER && <AddFeedbackModal />}

      {/* logo */}
      <a className="navbar-brand mx-3" href="/">
        <img
          src={LOGO}
          alt="Logo"
          style={{
            maxWidth: "100%",
            maxHeight: "45px",
            backgroundColor: "#fff",
          }}
          className="rounded"
        />
      </a>

      {/* vertical line using plain css */}
      <div
        className="d-none d-lg-block"
        style={{ borderLeft: "3px solid #fff", height: 40 }}
      ></div>

      {/* navbar links */}
      {user && user.role === USER_ROLES.CUSTOMER && (
        <div className="" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li
              className="nav-item mx-3 px-2 rounded-pill"
              style={{
                backgroundColor: "#271520",
              }}
            >
              <button
                className="nav-link fw-bold p-1"
                style={{ color: "#fff" }}
                onClick={openAddFeedbackModal}
              >
                Give Feedback
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        {user && (
          <>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-3">
                <img
                  src={`https://api.dicebear.com/8.x/micah/svg?seed=${user?.name}&flip=true&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`}
                  alt="User Avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #271520",
                  }}
                />{" "}
              </li>

              {(user.role === USER_ROLES.ADMIN ||
                user.role === USER_ROLES.CUSTOMER) && (
                <li className="nav-item mx-2 align-self-center">
                  <a
                    className="btn"
                    style={{
                      backgroundColor: "#FCD34D",
                      color: "#271520",
                      border: "2px solid #271520",
                    }}
                    href={
                      user.role === USER_ROLES.ADMIN ? "/admin" : "/customer"
                    }
                  >
                    Dashboard
                  </a>
                </li>
              )}

              <li className="nav-item mx-2 align-self-center">
                <button
                  // white border
                  className="btn"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  style={{
                    backgroundColor: "#271520",
                    color: "#fff",
                    border: "2px solid #fff",
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
