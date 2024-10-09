import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Input from "./Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

function UserModal({ isOpen, onClose, userData, setUser, user, isEditing }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && userData) {
      reset(userData); // Prefill the form with user data if editing
    }
  }, [isEditing, userData, reset]);

  const onSubmit = async (data) => {
    setError("");

    // Format the data in case of editing or creating a new user
    const formattedData = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.street,
        city: data.city,
      },
      company: {
        name: data.company,
      },
      website: data.website,
    };

    try {
      if (isEditing) {
        // Simulate PUT request for editing an existing user
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${userData.id}`,
          formattedData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const indx = user.findIndex((user) => user.id === response.data.id);
          user.splice(indx, 1, response.data)
          setUser(user)     
          toast.success("User updated successfully!");
        }
      } else {
        // Simulate POST request for adding a new user
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formattedData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 201) {
          response.data.id = user.length + 1;
          setUser([...user, response.data]);
          toast.success("User added successfully!");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative w-full h-full sm:max-w-xl bg-white p-5 rounded-lg shadow-md mx-auto my-8 overflow-y-auto sm:max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h1 className="text-center text-3xl font-extrabold">
        {isEditing ? "Edit User" : "Create User"}
      </h1>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        {/* Input Fields */}
        <Input
          type="text"
          label="Name"
          placeholder="Enter your name"
          {...register("name", {
            required: "This field is required",
            minLength: { value: 3, message: "Minimum 3 characters." },
          })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <Input
          type="text"
          label="Username"
          placeholder="Enter your username"
          {...register("username", { required: "This field is required" })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <Input
          type="text"
          label="Phone"
          placeholder="Enter your phone number"
          {...register("phone", { required: "This field is required" })}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}

        {/* Address Inputs */}
        <div className="mt-2">
          <p className="font-bold text-xl">Address</p>
          <div className="sm:flex-row flex flex-col gap-2">
            <div>
              {" "}
              <Input
                type="text"
                label="Street"
                placeholder="Enter your street"
                {...register("street", { required: "This field is required" })}
              />
              {errors.street && (
                <span className="text-red-500">{errors.street.message}</span>
              )}
            </div>

            <div>
              <Input
                type="text"
                label="City"
                placeholder="Enter your city"
                {...register("city", { required: "This field is required" })}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Company and Website */}
        <Input
          type="text"
          label="Company Name"
          placeholder="Enter your company name"
          {...register("company", {
            validate: {
              isValidLength: (value) =>
                !value || value.length >= 3 || "Must be at least 3 characters.",
            },
          })}
        />
        {errors.company && (
          <span className="text-red-500 mt-1">{errors.company.message}</span>
        )}

        {/* Website field */}
        <Input
          type="text"
          label="Website"
          placeholder="Enter your website URL"
          {...register("website", {
            validate: {
              isValidURL: (value) =>
                !value ||
                /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}.*$/.test(value) ||
                "Must be a valid URL.",
            },
          })}
        />
        {errors.website && (
          <span className="text-red-500 mt-1">{errors.website.message}</span>
        )}

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn text-white bg-[#2c3e50] hover:text-black"
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
      <button
        className="btn mt-6 w-full bg-[#16a085] text-white py-2 rounded hover:text-black"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
}

export default UserModal;
