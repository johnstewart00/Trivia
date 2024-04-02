"use client";

import { FormControl, FormLabel, Input } from "@mui/material";
import { MuiBox } from "./Box";
import { MuiButton } from "./MuiButton";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { CenterPage } from "./CenterPage";
import Spacer, { SpacerSizes } from "./Spacer";
import { IoIosArrowBack } from "react-icons/io";
import { Paragraph } from "./Paragraph";

interface RegisterParams {
  setLoggedIn: Function;
  setShowRegister: Function;
}

export default function Register({
  setLoggedIn,
  setShowRegister,
}: RegisterParams) {
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleRegister = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/register",
        data: {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      });
      setLoggedIn(true);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (typeof axiosError.response?.data === "string") {
        setError(axiosError.response.data);
      }
    }
  };
  return (
    <div>
      <CenterPage>
        <Spacer size={SpacerSizes.large} />
        <MuiBox>
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

            <FormControl sx={{ marginBottom: 2, marginLeft: 2 }}>
              <FormLabel>First Name:</FormLabel>
              <Input
                id="firstName"
                type="text"
                className="FormInput"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>

            <FormControl sx={{ marginBottom: 2, marginLeft: 2 }}>
              <FormLabel>Last Name:</FormLabel>
              <Input
                id="lastName"
                type="text"
                className="FormInput"
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>

            {/* Additional FormControl for gender input */}
          </form>
          {error && <Paragraph>{error}</Paragraph>}
          <MuiButton onClick={() => setShowRegister(false)}>
            <IoIosArrowBack size="2em" />
          </MuiButton>
          <MuiButton onClick={handleRegister}>Register</MuiButton>
        </MuiBox>
      </CenterPage>
    </div>
  );
}
