"use client";

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    code: "",
  });

  const handleChange = (key, value) => {
    setUserDetail((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("/api/user", {
        userDetail: userDetail,
      });

      if (response.data) {
        toast.success("User created successfully!");

        setUserDetail({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          code: "",
        });
      }
    } catch (error) {
      toast.error("Failed to create user.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl border-b font-semibold border-gray-300 text-gray-900 pb-5">
        User Creation
      </h2>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                value={userDetail.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                value={userDetail.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={userDetail.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Phone number
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                name="phone-number"
                type="text"
                value={userDetail.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                id="street-address"
                name="street-address"
                type="text"
                value={userDetail.street}
                onChange={(e) => handleChange("street", e.target.value)}
                autoComplete="street-address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mt-8">
          <div>
            <label
              htmlFor="city"
              className="block text-sm/6 font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2.5">
              <input
                id="city"
                name="city"
                type="text"
                value={userDetail.city}
                onChange={(e) => handleChange("city", e.target.value)}
                autoComplete="address-level2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="region"
              className="block text-sm/6 font-medium text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2.5">
              <input
                id="region"
                name="region"
                value={userDetail.state}
                onChange={(e) => handleChange("state", e.target.value)}
                type="text"
                autoComplete="address-level1"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="postal-code"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2.5">
              <input
                id="postal-code"
                name="postal-code"
                type="text"
                value={userDetail.code}
                onChange={(e) => handleChange("code", e.target.value)}
                autoComplete="postal-code"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            onClick={handleCreate}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
