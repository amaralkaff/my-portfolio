// src/components/UserProviderWithNavigate.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";
import { auth } from "../firebaseConfig";

const UserProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate("/login"); // Navigate to login after signing out
  };

  return <UserProvider value={{ logout }}>{children}</UserProvider>;
};

UserProviderWithNavigate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProviderWithNavigate;
