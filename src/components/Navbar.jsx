import React, { useState } from "react";
import AddUserModel from "./UserModal"; // Importing the AddUserModel component

// Navbar component that receives 'setUser' and 'user' props
export function Navbar({ setUser, user }) {
  // State to manage the visibility of the Add User modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Navbar layout with basic UI elements */}
      <nav className="navbar bg-base-100 border flex justify-between">
        {/* Logo or branding */}
        <div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        {/* Navigation and actions */}
        <div>
          <a className="btn btn-ghost text-xl">Home</a>
          {/* Button to trigger modal opening */}
          <button onClick={openModal} className="btn btn-ghost text-xl">
            New User
          </button>
        </div>

        {/* Search input with a button */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          {/* Search icon button */}
          <button className="btn btn-ghost btn-circle ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Conditionally rendering the AddUserModel component, passing props */}
      <AddUserModel
        setUser={setUser}
        user={user}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
