"use client";
import EditModal from "@/client/components/EditModal";
import { FunnelIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [Users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModel, setOpenModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (key, value) => {
    setSelectedUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGet = async () => {
    try {
      const response = await axios.get("/api/user", {
        params: { search, city, page, limit },
      });
      const { data, pagination } = response.data;
      setUsers(data);
      setTotal(pagination.total);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put("/api/user", {
        userDetail: selectedUser,
      });

      if (response.data) {
        toast.success("User updated successfully!");
        setOpenModel(false);
        setSelectedUser(null);
        handleGet(); // refresh the user list
      }
    } catch (err) {
      toast.error("Failed to update user.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete("/api/user", {
        data: { id: userId },
      });

      if (response.data) {
        toast.success("User deleted successfully!");
      }

      setUsers(Users.filter((user) => user._id !== userId));
    } catch (err) {
      toast.error("Failed to create user.");
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      <h2 className="text-2xl border-b font-semibold border-gray-300 text-gray-900 pb-5">
        User Management
      </h2>
      <div className="flex justify-between items-center my-5">
        <p className="text-gray-900">
          Total Number Of Users :{" "}
          <span className="text-red-400 font-semibold">{total}</span>
        </p>
        <button className="flex text-nowrap items-center gap-2 border border-gray-300 rounded-sm px-2.5 py-1.5 text-gray-900">
          Filter <FunnelIcon className="size-4" />{" "}
        </button>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by city..."
          className="border px-3 py-1 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <table className="border border-gray-300 rounded-sm w-full">
        <thead>
          <tr className="bg-gray-200 border-b border-gray-300">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">FirstName</th>
            <th className="border border-gray-300 px-4 py-2">LastName</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">state</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users?.length > 0 ? (
            Users.map((user, index) => (
              <tr
                key={user?._id}
                className="border-b border-gray-300 hover:bg-gray-100/80"
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user?.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user?.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user?.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user?.city}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user?.state}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex md:flex-row flex-col justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenModel(true);
                      }}
                      className="bg-gray-900 text-sm text-white w-24 h-9 rounded-sm hover:bg-gray-700 transition-all duration-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="bg-red-600 text-sm text-white w-24 h-9 rounded-sm hover:bg-red-500 transition-all duration-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-2 text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {openModel && selectedUser && (
        <EditModal
          userDetail={selectedUser}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          onClose={() => {
            setOpenModel(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default Page;
