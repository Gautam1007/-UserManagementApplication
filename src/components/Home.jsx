// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Navbar } from "./Navbar";
// import UserModal from "./UserModal";

// function Home() {
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/users"
//         );
//         if (response.status === 200) {
//           setUser(response.data);
//         } else {
//           setError("Users Not Found");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   const handleEditClick = (user) => {
//     setSelectedUser(user); // Set the user to be edited
//     setIsEditing(true); // Set editing mode
//     setIsModalOpen(true); // Open the modal
//   };

//   if (error) {
//     return <h1>{error}</h1>;
//   }

//   if (loading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <>
//       <Navbar setUser={setUser} user={user} />
//       <div>
//         <div className="relative overflow-x-auto shadow-md m-6">
//           <h1 className="text-center text-3xl font-semibold mb-4">
//             User Managment Application
//           </h1>
//           <table className="w-full text-sm text-left text-blue-100">
//             <thead className="text-xs text-white uppercase bg-[#2c3e50] border-b border-[#2c3e50]">
//               <tr>
//                 <th scope="col" className="pl-4 py-3">
//                   UserID
//                 </th>
//                 <th scope="col" className="pl-4 py-3">
//                   Username
//                 </th>
//                 <th scope="col" className="pl-4 py-3">
//                   Email
//                 </th>
//                 <th scope="col" className="pl-4 py-3">
//                   Phone No
//                 </th>
//                 <th scope="col" className="pl-4 py-3">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {user.length > 0 &&
//                 user.map((user, index) => (
//                   <tr
//                     key={user.id}
//                     className={
//                       index % 2 === 0
//                         ? "bg-[#16a085] border-b border-[#16a085]"
//                         : "bg-[#2c3e50] border-b border-[#2c3e50]"
//                     }
//                   >
//                     <td className="pl-4 py-4">{user.id}</td>
//                     <td className="pl-4 py-4">{user.username}</td>
//                     <td className="pl-4 py-4">{user.email}</td>
//                     <td className="pl-4 py-4">{user.phone}</td>
//                     <td className="pl-4 py-4">
//                       <a
//                         href="#"
//                         className="font-medium text-white hover:underline mx-4"
//                         onClick={() => handleEditClick(user)}
//                       >
//                         Edit
//                       </a>
//                       <a
//                         href="#"
//                         className="font-medium text-white hover:underline"
//                       >
//                         Delete
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* User Modal for Editing */}
//       {isModalOpen && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           userData={selectedUser}
//           setUser={setUser}
//           user={user}
//           isEditing={isEditing}
//         />
//       )}
//     </>
//   );
// }

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import UserModal from "./UserModal";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

function Home() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setError("Users Not Found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the user to be edited
    setIsEditing(true); // Set editing mode
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user); // Set the user to be deleted
    setIsConfirmationOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      // Simulate DELETE request
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userToDelete.id}`
      );
      if (response.status === 200) {
        // Remove the deleted user from the UI
        const updatedUsers = user.filter((u) => u.id !== userToDelete.id);
        setUser(updatedUsers);
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting user!");
    } finally {
      setIsConfirmationOpen(false); // Close the confirmation modal
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Navbar setUser={setUser} user={user} />
      <div>
        <div className="relative overflow-x-auto shadow-md m-10">
          <table className="w-full text-sm text-left text-blue-100">
            <thead className="text-xs text-white uppercase bg-[#2c3e50] border-b border-[#2c3e50]">
              <tr>
                <th scope="col" className="pl-4 py-3">UserID</th>
                <th scope="col" className="pl-4 py-3">Username</th>
                <th scope="col" className="pl-4 py-3">Email</th>
                <th scope="col" className="pl-4 py-3">Phone No</th>
                <th scope="col" className="pl-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 &&
                user.map((user, index) => (
                  <tr
                    key={user.id}
                    className={
                      index % 2 === 0
                        ? "bg-[#16a085] border-b border-[#16a085]"
                        : "bg-[#2c3e50] border-b border-[#2c3e50]"
                    }
                  >
                    <td className="pl-4 py-4">{index+1}</td>
                    <td className="pl-4 py-4">{user.username}</td>
                    <td className="pl-4 py-4">{user.email}</td>
                    <td className="pl-4 py-4">{user.phone}</td>
                    <td className="pl-4 py-4">
                      <a
                        href="#"
                        className="font-medium text-white hover:underline mx-4"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="font-medium text-white hover:underline mx-4"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal for Editing */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={selectedUser}
          setUser={setUser}
          user={user}
          isEditing={isEditing}
        />
      )}

      {/* Confirmation Modal for Deleting */}
      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={confirmDelete}
          message={`Are you sure you want to delete ${userToDelete?.username}?`}
        />
      )}
    </>
  );
}

export default Home;
