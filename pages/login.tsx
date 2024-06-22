import { useState } from "react";
import type { NextPage } from "next";
import { Layout } from "../components";
import { Button, Card, Input, Text } from "@nextui-org/react";
import Router from "next/router";
import { getUserFromEmailAPI, retrieveWallet } from "../utils/apis/api"; // Adjust this import based on your actual API file path

export interface SignUp {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState<SignUp>({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await getUserFromEmailAPI(signupDetails.email);
    if (res) {
      localStorage.setItem("user_id", res.id);
      localStorage.setItem("email", res.email);
      await retrieveWallet(res.id);
      Router.push("/account");
    }
  };

  return (
    <Layout>
      <Card css={{ mw: "400px", marginTop: "4rem", marginLeft: "auto", marginRight: "auto" }}>
        <Card.Body>
          <form className="px-4 py-4" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <Text>Email</Text>
            <Input
              type="text"
              className="mb-4"
              fullWidth
              name="email"
              placeholder="Email"
              value={signupDetails.email}
              onChange={handleChange}
            />
            <Text>Password</Text>
            <Input
              type="password"
              className="mb-4"
              fullWidth
              name="password"
              placeholder="Password"
              value={signupDetails.password}
              onChange={handleChange}
            />
            <Button type="submit" css={{ width: "100%", backgroundColor: 'green' }}>
              Login
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Login;
