/**
 * @jest-environment node
 * */

"use strict";

const User = require("../models/User");
const fetch = require("node-fetch");

describe("User auth testing", () => {
  afterAll(async () => {
    await fetch("http://localhost:4000/user/test/warning/no/delete");
  });

  test("Register without password", async () => {
    const body = {
      email: "test1@gmail.com",
      password: "",
      firstname: "glenn",
      lastname: "steven",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/register", fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        expect(response.message.msgError).toBe(true);
      });
  });

  test("Register user", async () => {
    const body = {
      email: "test1@gmail.com",
      password: "123",
      firstname: "glenn",
      lastname: "steven",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/register", fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        expect(response.message.msgError).toBe(false);
      });
  });

  test("Register user with duplicate emailaddress", async () => {
    const body = {
      email: "test1@gmail.com",
      password: "123",
      firstname: "glenn",
      lastname: "steven",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/register", fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        expect(response.message.msgError).toBe(true);
      });
  });

  test("Logout without logging in", async () => {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    };
    await fetch("http://localhost:4000/user/logout", fetchOptions).then(
      (response) => {
        console.log("1");
        console.log(response);
        expect(response.status).toBe(401);
      }
    );
  });

  test("Login with wrong email", async () => {
    const body = {
      email: "test2@gmail.com",
      password: "123",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/login", fetchOptions).then(
      (response) => {
        expect(response.status).toBe(401);
      }
    );
  });

  test("Login with wrong password", async () => {
    const body = {
      email: "test1@gmail.com",
      password: "12",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/login", fetchOptions).then(
      (response) => {
        expect(response.status).toBe(401);
      }
    );
  });

  test("Login with right email and password", async () => {
    const body = {
      email: "test1@gmail.com",
      password: "123",
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    };
    await fetch("http://localhost:4000/user/login", fetchOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        expect(response.isAuthenticated).toBe(true);
      });
  });
});
