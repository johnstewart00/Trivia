import { FormControl, FormLabel, Input } from "@mui/material";
import { MuiButton } from "./MuiButton";
import axios, { AxiosError } from "axios";
import { Paragraph } from "./Paragraph";
import { useState } from "react";

interface LoginParams {
  username?: string;
  setUsername: Function;
  password?: string;
  setPassword: Function;
  setLoggedIn: Function;
}

export const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  setLoggedIn,
}: LoginParams) => {
  const [loginError, setLoginError] = useState<string | undefined>();
  const handleLogin = async () => {
    console.log("logging in");
    console.log("username: ", username, " password: ", password);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/login",
        data: {
          username: username,
          password: password,
        },
      });
      setLoggedIn(true);
      console.log("response was: ", response);
      setLoggedIn(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (typeof axiosError.response?.data === "string") {
        setLoginError(axiosError.response.data);
      }
    }
  };
  return (
    <div>
      <form className="signupForm" style={{ width: 500 }}>
        <FormControl sx={{ marginBottom: 2, marginLeft: 2 }}>
          <FormLabel>Username:</FormLabel>
          <Input
            id="username"
            type="text"
            className="FormInput"
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>

        <FormControl sx={{ marginBottom: 2, marginLeft: 2 }}>
          <FormLabel>Password:</FormLabel>
          <Input
            id="password"
            type="password"
            className="FormInput"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <MuiButton onClick={handleLogin}>Login</MuiButton>
      </form>
      {loginError && <Paragraph>{loginError}</Paragraph>}
    </div>
  );
};
