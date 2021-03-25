import React from "react";

import logo from "./assets/logo.png";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

class Login extends React.Component {
  state = { username: "", password: "" };

  usersDetail = [
    { username: "Aman", password: "aman123" },
    { username: "Sonu", password: "sonu123" },
    { username: "Piku", password: "piku123" },
    { username: "Aditya", password: "aditya123" },
    { username: "Vishal", password: "vishal123" },
    { username: "Gyan", password: "gyan123" },
    { username: "Ayush", password: "ayush123" },
    { username: "Navneet", password: "navneeet123" },
    { username: "Suman", password: "suman123" },
    { username: "Shubnam", password: "shubnam123" },
  ];

  // To check user Authentication
  login = (e) => {
    e.preventDefault();
    for (let i = 0; i < this.usersDetail.length; i++) {
      if (
        this.usersDetail[i].username === this.state.username &&
        this.usersDetail[i].password === this.state.password
      ) {
        this.props.login(true);
        break;
      }
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "97vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "whitesmoke",
        }}
      >
        <Card style={{ width: "30%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "80px",
              marginTop: "-8%",
            }}
          >
            <img src={logo} alt="Logo" />
          </div>
          <div
            className="p-formgroup-inline"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="p-field" style={{ width: "100%" }}>
              <label htmlFor="firstname5" className="p-sr-only">
                Firstname
              </label>
              <InputText
                id="firstname5"
                type="text"
                placeholder="Firstname"
                style={{ width: "100%" }}
                required
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="p-field" style={{ width: "100%" }}>
              <label htmlFor="lastname5" className="p-sr-only">
                Password
              </label>
              <InputText
                id="lastname5"
                type="password"
                placeholder="Password"
                style={{ width: "100%", marginTop: "3%" }}
                required
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <Button
              type="button"
              label="Submit"
              style={{ width: "100%", marginTop: "3%" }}
              onClick={(e) => this.login(e)}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default Login;
