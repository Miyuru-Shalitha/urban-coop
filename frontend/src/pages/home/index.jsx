import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import NavBar from "../../components/NavBar";
import { USER_ROLES } from "../../constants/roles";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  //
  return (
    <>
      <NavBar />
      <div className="container">
        <header className="bg-light p-5 rounded-lg m-3">
          <h1>Pet Care System</h1>
          <p></p>
          {user && (
            <>
              <div className="alert alert-primary" role="alert">
                You are logged in as <strong>{user.role}</strong>
              </div>
              <h3>Welcome, {user.name}</h3>
              <button
                className="btn"
                style={{
                  backgroundColor: "#E5A700",
                }}
              >
                <a
                  // MANAGER, EXECUTIVE, GENERAL
                  href={user.role === USER_ROLES.ADMIN ? "/admin" : "/customer"}
                  className="text-decoration-none"
                  style={{ color: "#271520" }}
                >
                  {user.role === USER_ROLES.ADMIN
                    ? "Admin Dashboard"
                    : "Customer Dashboard"}
                </a>
              </button>
              <button
                onClick={logout}
                className="btn mx-2"
                style={{
                  backgroundColor: "#271520",
                  color: "#fff",
                }}
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="btn"
                style={{
                  backgroundColor: "#271520",
                  color: "#fff",
                }}
              >
                Login
              </Link>
            </>
          )}
        </header>
      </div>
    </>
  );
};

export default Home;
