// src/pages/Home.jsx
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Donut3D from "../components/Donut3D";

const Home = () => {
  const { theme } = useContext(UserContext);

  return (
    <div>
      <Donut3D theme={theme} />
    </div>
  );
};

export default Home;
