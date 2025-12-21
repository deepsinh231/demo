import React from "react";
import CONFIG from "./Config";
import axios from "axios";

function App() {
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const apiCall = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${CONFIG.BASE_URL_LOGIN}/users`);
      setUsers(res.data.users || []);
      setFilteredUsers(res.data.users || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = users.filter((u) =>
      u.firstName.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  React.useEffect(() => {
    apiCall();
  }, []);

  if (loading) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white p-5">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-800 p-2 rounded mb-3"
        onChange={handleSearch}
      />

      {filteredUsers.map((u) => (
        <p key={u.id}>{u.firstName}</p>
      ))}
    </div>
  );
}

export default App;
