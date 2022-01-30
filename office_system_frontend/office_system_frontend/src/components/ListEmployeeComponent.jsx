import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({
                employees: res.data
            });
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/-1');
    }

    editEmployee(employeeId){
        this.props.history.push(`/add-employee/${employeeId}`);
    }

    viewEmployee(employeeId){
        this.props.history.push(`/view-employee/${employeeId}`)
    }

    deleteEmployee(employeeId){
        EmployeeService.deleteEmployeeById(employeeId).then( res => {
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !== employeeId)
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Employee List</h2>
                <div>
                    <Button size = 'sm' variant = 'outline-primary' onClick = {this.addEmployee}>Add Employee</Button>{' '}
                </div>
                <br></br>
                <div>
                    <Table striped bordered hover responsive style = {{whiteSpace: "nowrap"}}>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName} </td>
                                        <td> {employee.email} </td>
                                        <td>
                                            <button className = "btn btn-info" onClick = {() => this.editEmployee(employee.id)}>
                                                Update
                                            </button>
                                            <button className = "btn btn-warning" style = {{marginLeft: "10px"}}
                                                onClick = {() => this.viewEmployee(employee.id)}>
                                                View
                                            </button>
                                            <button className = "btn btn-danger" style = {{marginLeft: "10px"}}
                                                onClick = {() => this.deleteEmployee(employee.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;