import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class StudentEdit extends Component {

    emptyItem = {
        fName: '',
        lName: '',
        mName: '',
        sex: '',
        email: '',
        birthday: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/student/${this.props.match.params.id}`)).json();
            this.setState({item: group});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/student', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/students');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Student' : 'Add Student'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="fName">First name</Label>
                        <Input type="text" name="fName" id="fName" value={item.fName || ''}
                               onChange={this.handleChange} autoComplete="First name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lName">Last name</Label>
                        <Input type="text" name="lName" id="lName" value={item.lName || ''}
                               onChange={this.handleChange} autoComplete="Last name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="mName">Middle name</Label>
                        <Input type="text" name="city" id="mName" value={item.mName || ''}
                               onChange={this.handleChange} autoComplete="Middle name"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="sex">sex</Label>
                            <Input type="text" name="sex" id="sex" value={item.sex || ''}
                                   onChange={this.handleChange} autoComplete="sex"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="email">email</Label>
                            <Input type="email" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="birthday">Birthday</Label>
                            <Input type="text" name="birthday" id="birthday" value={item.birthday || ''}
                                   onChange={this.handleChange} autoComplete="birthday"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/students">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(StudentEdit);