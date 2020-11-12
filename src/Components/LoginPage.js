import React, { useReducer } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import "./Form.css";

const initialState = {
  username: "",
  password: "",
  islogin: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "username": {
      return { ...state, username: action.value };
    }
    case "password": {
      return { ...state, password: action.value };
    }
    case "login": {
      return { ...state, islogin: action.value };
    }
    default: {
      return { ...state };
    }
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const SubmitAbout = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:3000/users?email=${state.username}&password=${state.password}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.length === 0) {
          alert("email and password is not found");
        } else {
          console.log("login successful");
          localStorage.setItem("userID", json[0].id);
          localStorage.setItem(
            "name",
            json[0].first_name + " " + json[0].last_name
          );
          localStorage.setItem("img", json[0].avatar);
          localStorage.setItem("email", json[0].email);
          dispatch({ type: "login", value: !state.islogin });
          window.location.reload(false);
        }
      })
      .catch((error) =>
        alert("Something is incorrect , try after some  time ")
      );
  };

  if (state.islogin) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="Background">
        <div className="wrapper ">
          <Form onSubmit={SubmitAbout} className="login-form">
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                value={state.username}
                onChange={(e) => {
                  dispatch({ type: "username", value: e.target.value.trim() });
                }}
                required
              />
              <br />
              <Label>Password</Label>
              <Input
                type="password"
                value={state.password}
                onChange={(e) => {
                  dispatch({ type: "password", value: e.target.value });
                }}
                required
              />
              <br />
              <Button type="submit" className="btn-lg btn-dark btn-block">
                Submit
              </Button>
              <br />
            </FormGroup>
            <FormGroup>
              <Link to="/Registration">Sing-Up</Link>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
};
export default Login;
