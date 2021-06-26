import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../store/store";

const Profile = (props) => {
  const [state, dispatch] = useStoreContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [signUpCreds, setSignUpCreds] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/users/signup", {
        email: signUpCreds.email,
        password: signUpCreds.password,
        first_name: signUpCreds.first_name,
        last_name: signUpCreds.last_name,
      })
      .then((response) => {
        console.log("RESPONSE", response);
        if (response.data.status === "error") {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
        history.replace("/admin");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMsg(error);
      });
  };

  return (
    <>
      <Button variant='primary' className='my-2' onClick={handleShow}>
        Update Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-signin'>
            <label htmlFor='inputFirst' className='sr-only'>
              First Name
            </label>
            <input
              type='string'
              id='inputFirst'
              className='form-control'
              name='first_name'
              placeholder={state.user.first_name}
              value={signUpCreds.first_name}
              onChange={handleChange}
            />
            <label htmlFor='inputLast' className='sr-only'>
              Last Name
            </label>
            <input
              type='string'
              id='inputLast'
              className='form-control'
              name='last_name'
              placeholder={state.user.last_name}
              value={signUpCreds.last_name}
              onChange={handleChange}
            />
            <label htmlFor='inputEmail' className='sr-only'>
              Email address
            </label>
            <input
              type='email'
              id='inputEmail'
              className='form-control'
              name='email'
              placeholder={state.user.email}
              value={signUpCreds.email}
              onChange={handleChange}
            />
            <label htmlFor='inputPassword' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              id='inputPassword'
              className='form-control'
              name='password'
              placeholder='Password'
              value={signUpCreds.password}
              onChange={handleChange}
            />
            <label htmlFor='inputPasswordAgain' className='sr-only'>
              Password Again
            </label>
            <input
              type='password'
              id='inputPassword'
              className='form-control'
              name='password'
              placeholder='Password'
              value={signUpCreds.password}
              onChange={handleChange}
            />
            {/* <Checkbox style={{ marginLeft: '15px' }} >Admin User </Checkbox> */}
            {/* <Form.Check className='mt-2' type='checkbox' label='Admin User' /> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Profile.propTypes = {};

export default Profile;