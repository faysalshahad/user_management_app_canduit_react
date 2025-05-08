import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="home-page">
      <div className="form-section">
        <UserForm onUserCreated={handleUserCreated} />
      </div>
      <div className="list-section">
        <UserList key={refreshKey} />
      </div>
    </div>
  );
};

export default Home;
