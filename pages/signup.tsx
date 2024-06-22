import { useState } from "react";
import { NextPage } from "next";
import { signupAPI, createWalletAPI, retrieveWallet } from "../utils/apis/api";
import { Layout } from "../components";
import { Button, Card, Input, Modal, Text, Table, Tooltip } from "@nextui-org/react";
import Router from "next/router";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPass: string;
  gender: string;
}

const allowedEmails = ["psi@ksp.com", "pi@ksp.com", "dysp@ksp.com"];

const Signup: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState<SignUp>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    gender: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email } = signupDetails;

    if (!allowedEmails.includes(email)) {
      setIsModalVisible(true);
      return;
    }

    localStorage.setItem("email", email);

    Router.push({
      pathname: "/index1.html",
      query: { email: email }
    });

    await signupAPI({
      username: signupDetails.username,
      email: signupDetails.email,
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      password: signupDetails.password,
      gender: signupDetails.gender,
    });

    await createWalletCall();
  };

  const createWalletCall = async () => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      const res = await createWalletAPI(user_id);
      const res1 = await retrieveWallet(user_id);
    }
  };

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      alert(`Copied ${email} to clipboard`);
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <Layout>
      <div className="md:w-[400px] w-[350px] mx-auto" style={{ marginLeft: "190px" }}>
        <Card
          css={{
            marginTop: "4rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Body>
            <form
              className="px-4 py-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <div className="mb-4 text-sm text-gray-500">Email</div>
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="email"
                placeholder="Please Enter Your Email ID"
                value={signupDetails.email}
                onChange={handleChange}
              />

              <div className="mb-4 text-sm text-gray-500">Password</div>
              <Input
                type="password"
                className="mb-4"
                fullWidth
                name="password"
                placeholder="Please Enter Your Password"
                value={signupDetails.password}
                onChange={handleChange}
              />

              <Button type="submit" css={{ width: "100%", backgroundColor: "green" }}>
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>

        <Modal
          closeButton
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Invalid Email
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              Please use one of the following emails:
            </Text>
            <Table
              aria-label="Allowed Emails"
              css={{ minWidth: "100%", marginTop: "10px" }}
              shadow={false}
              bordered
            >
              <Table.Header>
                <Table.Column>Email</Table.Column>
                <Table.Column>Action</Table.Column>
              </Table.Header>
              <Table.Body>
                {allowedEmails.map((email) => (
                  <Table.Row key={email}>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>
                      <Tooltip content="Copy">
                        <Button
                          auto
                          light
                          onClick={() => handleCopy(email)}
                        >
                          Copy
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat css={{ backgroundColor: "green", color: "white" }} onClick={() => setIsModalVisible(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default Signup;
