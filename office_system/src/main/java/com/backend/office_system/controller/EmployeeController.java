package com.backend.office_system.controller;

import com.backend.office_system.exception.ResourceNotFoundException;
import com.backend.office_system.model.Employee;
import com.backend.office_system.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getEmployees(){
        return employeeRepository.findAll();
    }

    // create an employee
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        //employeeRepository.save(new Employee("Testput","Testput","testup@q.q"));
        return employeeRepository.save(employee);
    }

    // get employee by id
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID not exists: " + id));
        return ResponseEntity.ok(employee);
    }

    // update employee
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee receivedEmployee){
        Employee foundEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID not exists: " + id));

        foundEmployee.setFirstName(receivedEmployee.getFirstName());
        foundEmployee.setLastName(receivedEmployee.getLastName());
        foundEmployee.setEmail(receivedEmployee.getEmail());

        Employee updatedEmployee = employeeRepository.save(foundEmployee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Employee foundEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee with ID not exists: " + id));
        employeeRepository.delete(foundEmployee);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
