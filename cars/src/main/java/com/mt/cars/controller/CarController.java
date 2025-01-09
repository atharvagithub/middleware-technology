package com.mt.cars.controller;

import com.mt.cars.model.Car;
import com.mt.cars.repo.CarRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // Enable CORS for all origins
@RestController
public class CarController {
    @Autowired
    private CarRepository carRepository;

    // Create a new game
    @Transactional
    @PostMapping("/add")
    public String addCar(@RequestBody Car car) {
        carRepository.save(car);
        return "Car added successfully!";
    }

    // Read all games
    @GetMapping("/getAll")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Read a game by ID
    @GetMapping("/get/{id}")
    public Car getCarById(@PathVariable long id) {
        return carRepository.findById(id).orElse(null);
    }

    // Update a game by ID
    @Transactional
    @PutMapping("/update/{id}")
    public String updateCar(@PathVariable long id, @RequestBody Car updatedCar) {
        Car existingCar = carRepository.findById(id).orElse(null);
        if (existingCar == null) {
            return "Car not found!";
        }

        // Update fields on the managed entity
        existingCar.setName(updatedCar.getName());
        existingCar.setType(updatedCar.getType());
        existingCar.setCapacity(updatedCar.getCapacity());

        // No need to call save explicitly; JPA manages it automatically
        return "Car updated successfully!";
    }

    // Delete a game by ID
    @Transactional
    @DeleteMapping("/delete/{id}")
    public String deleteCar(@PathVariable long id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return "Car deleted successfully!";
        }
        return "Car not found!";
    }
}