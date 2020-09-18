import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class StudentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {students: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/student')//???
            .then(response => response.json())
            .then(data => this.setState({students: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/student/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedStudents = [...this.state.students].filter(i => i.id !== id);
            this.setState({students: updatedStudents});
        });
    }

    render() {
        const {students, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        const studentList = students.map(student => {
            // const address = `${student.fName || ''} ${student.lName || ''} ${student.email || ''}`;
            return <tr key={student.id}>
                <td style={{whiteSpace: 'nowrap'}}>{student.fName}</td>
                <td>{student.lName}</td>
                <td>{student.fName}</td>

                {/*<td>{group.events.map(event => {*/}
                {/*    return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {*/}
                {/*        year: 'numeric',*/}
                {/*        month: 'long',*/}
                {/*        day: '2-digit'*/}
                {/*    }).format(new Date(event.date))}: {event.title}</div>*/}
                {/*})}</td>*/}
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/students/" + student.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/students/new">Add Student</Button>
                    </div>
                    <h3>Students list</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Location</th>
                            <th>Events</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default StudentsList;