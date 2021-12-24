import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { login } from '../../api';
import instance from '../../axiosInstance';

// Import Images
import logo from "../../images/logo.png";
import { TextInput } from '../common/Input';


const validationSchema = Yup.object().shape({
	emailOrUserName: Yup.string()
	.email("Enter a valid email address")
	.required("Required"),
	password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
})

const FormLogin = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	
	const initialValues = {
		emailOrUserName: "",
		password: ""
	}

const LoginFn = async (values, errorcb, setIsLoading) => {
	setIsLoading(true);
	errorcb(null);
	try {
		let response = await instance.post(login, {...values})

		if(response.status === 200 || response.status === 204 || response.status === 201) {
			setIsLoading(false)
			createBootstrapComponent();
		}
	} catch(error) {
		setIsLoading(false);
		if(error.response) {
			errorcb(error.response.data.Message);
		
			return;
		}
		errorcb("We encountered an error login");
	}
}
	
		return (
			<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					LoginFn(values, setError, setIsLoading)
				}}
				>
					
					<Form>
				<div className="section-area account-wraper2">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-xl-5 col-lg-6 col-md-8">
								<div className="appointment-form form-wraper">
									<div className="logo">
										<img src={logo} alt=""/>
									</div>
									{error && <div>{error}</div>}
										<div className="form-group">
											<TextInput 
											type="email"
											className="form-control" 
											placeholder="Email"
											name="emailOrUserName"
										/>
										</div>
										<div className="form-group">
											<TextInput 
												type="password" 
												className="form-control" 
												placeholder="Password"
												name="password"
											/>
										</div>
										<div className="form-group">
											<button
												type="submit" 
												className="btn mb-30 btn-lg btn-primary w-100"
												disabled={isLoading}>{!isLoading ? "Login" : "Submitting..."}
											 </button>
											<div><Link to="/form-forget-password" data-toggle="tab">Forgot Password</Link></div>
											<div><Link to="/form-reset-password" data-toggle="tab">Reset Password</Link></div>
										</div>
										<div className="text-center mt-40">
											<p className="mt-0">Dont have any account?</p>
											<Link className="btn btn-lg btn-secondary w-100" data-toggle="tab" to="/form-register">Register</Link>
										</div>											
									
								</div>
							</div>
						</div>					
					</div>
				</div>
				</Form>
				</Formik>
			</>
		);
	}


export default FormLogin;





// /*!

// =========================================================
// * Argon Dashboard React - v1.2.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
// } from "reactstrap";

// const Login = () => {
//   return (
//     <>
//       <Col lg="5" md="7">
//         <Card className="bg-secondary shadow border-0">
//           <CardHeader className="bg-transparent pb-5">
//             <div className="text-muted text-center mt-2 mb-3">
//               <small>Sign in with</small>
//             </div>
//             <div className="btn-wrapper text-center">
//               <Button
//                 className="btn-neutral btn-icon"
//                 color="default"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <span className="btn-inner--icon">
//                   <img
//                     alt="..."
//                     src={
//                       require("../../assets/img/icons/common/github.svg")
//                         .default
//                     }
//                   />
//                 </span>
//                 <span className="btn-inner--text">Github</span>
//               </Button>
//               <Button
//                 className="btn-neutral btn-icon"
//                 color="default"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <span className="btn-inner--icon">
//                   <img
//                     alt="..."
//                     src={
//                       require("../../assets/img/icons/common/google.svg")
//                         .default
//                     }
//                   />
//                 </span>
//                 <span className="btn-inner--text">Google</span>
//               </Button>
//             </div>
//           </CardHeader>
//           <CardBody className="px-lg-5 py-lg-5">
//             <div className="text-center text-muted mb-4">
//               <small>Or sign in with credentials</small>
//             </div>
//             <Form role="form">
//               <FormGroup className="mb-3">
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-email-83" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Email"
//                     type="email"
//                     autoComplete="new-email"
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-lock-circle-open" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Password"
//                     type="password"
//                     autoComplete="new-password"
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <div className="custom-control custom-control-alternative custom-checkbox">
//                 <input
//                   className="custom-control-input"
//                   id=" customCheckLogin"
//                   type="checkbox"
//                 />
//                 <label
//                   className="custom-control-label"
//                   htmlFor=" customCheckLogin"
//                 >
//                   <span className="text-muted">Remember me</span>
//                 </label>
//               </div>
//               <div className="text-center">
//                 <Button className="my-4" color="primary" type="button">
//                   Sign in
//                 </Button>
//               </div>
//             </Form>
//           </CardBody>
//         </Card>
//         <Row className="mt-3">
//           <Col xs="6">
//             <a
//               className="text-light"
//               href="#pablo"
//               onClick={(e) => e.preventDefault()}
//             >
//               <small>Forgot password?</small>
//             </a>
//           </Col>
//           <Col className="text-right" xs="6">
//             <a
//               className="text-light"
//               href="#pablo"
//               onClick={(e) => e.preventDefault()}
//             >
//               <small>Create new account</small>
//             </a>
//           </Col>
//         </Row>
//       </Col>
//     </>
//   );
// };

// export default Login;
