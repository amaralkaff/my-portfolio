// src/components/middleware/RequireProfileCompletion.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../contexts/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

const RequireProfileCompletion = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (user && !user.name && !alertShown) {
      setLoading(true);
      Swal.fire({
        title: "Profile Incomplete",
        text: "Please complete your profile by entering your name.",
        icon: "warning",
        confirmButtonText: "Complete Profile",
      }).then((result) => {
        setLoading(false);
        if (result.isConfirmed) {
          navigate("/complete-profile");
        }
        setAlertShown(true);
      });
    }
  }, [user, navigate, alertShown]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default RequireProfileCompletion;
