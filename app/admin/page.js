"use client";
import EditModal from "@/client/components/EditModal";
import DeleteConfirmationModal from "@/client/components/DeleteConfirmationModal";
import { FunnelIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

const Page = () => {
  const [Users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModel, setOpenModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (key, value) => {
    setSelectedUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGet = async () => {
    try {
      const response = await axios.get("/api/user", {
        params: { search: debouncedSearch, city, state, page, limit, sortField, sortOrder },
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
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setCity("");
    setState("");
    setPage(1);
    setSortField("createdAt");
    setSortOrder("desc");
    setLimit(5);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // 400ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    handleGet();
    // eslint-disable-next-line
  }, [debouncedSearch, city, state, page, sortField, sortOrder, limit]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, city, state, sortField, sortOrder, limit]);

  const sortFieldOptions = [
    { value: "createdAt", label: "Sort by Created" },
    { value: "firstName", label: "Sort by First Name" },
    { value: "lastName", label: "Sort by Last Name" },
    { value: "email", label: "Sort by Email" },
    { value: "city", label: "Sort by City" },
    { value: "state", label: "Sort by State" },
  ];
  const sortOrderOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];
  const limitOptions = [
    { value: 3, label: "3 per page" },
    { value: 5, label: "5 per page" },
    { value: 7, label: "7 per page" },
  ];

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
        <button
          className="flex text-nowrap items-center gap-2 border border-gray-300 rounded-sm px-2.5 py-1.5 text-gray-900"
          onClick={() => setShowFilters((prev) => !prev)}
          type="button"
        >
          Filter <FunnelIcon className="size-4" />
        </button>
      </div>
      {showFilters && (
        <div className="flex flex-wrap gap-4 my-4 items-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border-gray-300 border px-3 py-1.5 rounded min-w-[180px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by city..."
            className="border-gray-300 border px-3 py-1.5 rounded min-w-[140px]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by state..."
            className="border-gray-300 border px-3 py-1.5 rounded min-w-[140px]"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <div className="min-w-[170px]">
            <Select
              options={sortFieldOptions}
              value={sortFieldOptions.find((o) => o.value === sortField)}
              onChange={(option) => setSortField(option.value)}
              isSearchable={false}
              classNamePrefix="react-select"
              placeholder="Sort Field"
            />
          </div>
          <div className="min-w-[140px]">
            <Select
              options={sortOrderOptions}
              value={sortOrderOptions.find((o) => o.value === sortOrder)}
              onChange={(option) => setSortOrder(option.value)}
              isSearchable={false}
              classNamePrefix="react-select"
              placeholder="Sort Order"
            />
          </div>
          <div className="min-w-[120px]">
            <Select
              options={limitOptions}
              value={limitOptions.find((o) => o.value === limit)}
              onChange={(option) => { setLimit(option.value); setPage(1); }}
              isSearchable={false}
              classNamePrefix="react-select"
              placeholder="Per Page"
            />
          </div>
          <button
            className="border border-gray-300 px-3 py-1.5 rounded bg-gray-50 hover:bg-gray-100"
            onClick={handleClearFilters}
            type="button"
          >
            Clear Filters
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
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
                      onClick={() => {
                        setUserToDelete(user._id);
                        setShowDeleteConfirm(true);
                      }}
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
      </div>
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
      {showDeleteConfirm && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteConfirm(false);
            setUserToDelete(null);
          }}
          onConfirm={() => handleDelete(userToDelete)}
        />
      )}
    </div>
  );
};

export default Page;
