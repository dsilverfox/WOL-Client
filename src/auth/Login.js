import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
         event.preventDefault();
         fetch("http://localhost:3000/user/login", {
            method: "POST",
            body: JSON.stringify({user: { username: username, password: password },}),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              props.updateToken(data.sessionToken);
            });
        };

    return (
      <div>
        <h1>Login</h1>
        <p>Enter a username to login</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="example@email.com" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
          </FormGroup>
          {((username) && (password)) ? <Button type="submit">Login</Button> : <div></div>}
        </Form>
      </div>
    );
}

export default Login;