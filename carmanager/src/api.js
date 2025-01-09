import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_HOST_IP_ADDRESS;
console.log("THIS IS CUSTOM O/P",API_BASE_URL);
console.log("HELLO FROM CODEBASE");
//const API_BASE_URL = "http://localhost:8086";

export const getAllCars = () => axios.get(`${API_BASE_URL}/getAll`);
export const addCar = (car) => axios.post(`${API_BASE_URL}/add`, car);
export const updateCar = (id, car) => axios.put(`${API_BASE_URL}/update/${id}`, car);
export const deleteCar = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);
