import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if(this.state.id == -1){
            return;
        }

        EmployeeService.getEmployeeById(this.state.id).then( res => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email
            });
        });
    }

    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };

        if(this.state.id == -1){
            EmployeeService.createEmployee(employee).then( res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployeeById(this.state.id, employee).then( res => {
                this.props.history.push('/employees');
            });
        }
    }

    cancel(){
        this.props.history.push('/employees');
    }

    changeFirstNameHandler = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }

    changeLastNameHandler = (event) => {
        this.setState({
            lastName: event.target.value
        });
    }

    changeEmailHandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    getTitle(){
        if(this.state.id == -1){
            return <h2 className = "text-center">Add Employee</h2>;
        } else {
            return <h2 className = "text-center">Update Employee</h2>;
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>First Name:</label>
                                        <input placeholder = "First Name" name = "firstName" className = "form-control"
                                            value = {this.state.firstName} onChange = {this.changeFirstNameHandler}/>
                                    </div>
                                    
                                    <div className = "form-group">
                                        <label>Last Name:</label>
                                        <input placeholder = "Last Name" name = "lastName" className = "form-control"
                                            value = {this.state.lastName} onChange = {this.changeLastNameHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label>Email Address:</label>
                                        <input placeholder = "Email Address" name = "email" className = "form-control"
                                            value = {this.state.email} onChange = {this.changeEmailHandler}/>
                                    </div>

                                    <button className = "btn btn-success" onClick = {this.saveEmployee}>Save</button>
                                    <button className = "btn btn-danger" onClick = {this.cancel}
                                        style = {{marginLeft: "10px"}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;