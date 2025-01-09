import React, { useEffect, useState } from "react";
import axios from "axios";

//const API_BASE_URL = "http://localhost:8086";
const API_BASE_URL = process.env.REACT_APP_HOST_IP_ADDRESS;
console.log("THIS IS CUSTOM O/P",API_BASE_URL);

const CarManager = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ name: "", type: "", capacity: 0 });
  const [editingCar, setEditingCar] = useState(null);

  // Fetch all cars when the component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddCar = async () => {
    try {
      await axios.post(`${API_BASE_URL}/add`, newCar);
      fetchCars();
      setNewCar({ name: "", type: "", capacity: 0 });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleUpdateCar = async () => {
    if (!editingCar) return;
    try {
      await axios.put(`${API_BASE_URL}/update/${editingCar.id}`, editingCar);
      fetchCars();
      setEditingCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="container">
      <h1>Car Manager</h1>

      {/* Add Car Form */}
      <div>
        <h2>Add Car</h2>
        <input
          type="text"
          placeholder="Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newCar.type}
          onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newCar.capacity}
          onChange={(e) =>
            setNewCar({ ...newCar, capacity: parseInt(e.target.value) })
          }
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {/* Edit Car Form */}
      {editingCar && (
        <div>
          <h2>Edit Car</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingCar.name}
            onChange={(e) =>
              setEditingCar({ ...editingCar, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Type"
            value={editingCar.type}
            onChange={(e) =>
              setEditingCar({ ...editingCar, type: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Capacity"
            value={editingCar.capacity}
            onChange={(e) =>
              setEditingCar({
                ...editingCar,
                capacity: parseInt(e.target.value),
              })
            }
          />
          <button onClick={handleUpdateCar}>Update Car</button>
        </div>
      )}

      {/* Cars List */}
      <div>
        <h2>Cars List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.type}</td>
                <td>{car.capacity}</td>
                <td>
                  <button onClick={() => setEditingCar(car)}>Edit</button>
                  <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarManager;
