import React, { useState, useEffect } from "react";
import "../styles/Api_disp.css";

type ResultProps = {
  id: number;
  email: string;
  name: string;
  password: string; // Adăugăm câmpul pentru parolă în tipul de date ResultProps
};

export default function Api_disp() {
  const [result, setResult] = useState<ResultProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [newUser, setNewUser] = useState<{ email: string; name: string; password: string }>({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setResult(jsonData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error fetching data");
    }
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData(); // Re-fetch data after successful update
      setEditingId(null);
      setEditedName("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error updating user");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData(); // Re-fetch data after successful delete
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error deleting user");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData(); // Re-fetch data after successful add
      setNewUser({ email: "", name: "", password: "" }); // Clear input fields
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error adding user");
    }
  };

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <div className="add-user">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {result.map((value, index) => (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{value.email}</td>
              <td>
                {editingId === value.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  value.name
                )}
              </td>
              <td>
                {editingId === value.id ? (
                  <>
                    <button onClick={() => handleUpdate(value.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(value.id, value.name)}>Edit</button>
                    <button onClick={() => handleDelete(value.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
