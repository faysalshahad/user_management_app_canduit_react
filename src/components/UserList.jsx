import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1,
    limit: 10,
  });

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://interview.canduit.org/api/users?page=${page}`,
        {
          headers: {
            "x-api-key": "63cfb3f2-4e2f-47f9-9ae8-cc5af4cc30dd",
          },
        }
      );
      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.emailAddress}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={pagination.pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
