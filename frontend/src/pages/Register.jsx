import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    idDocumentNumber: "",
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    surname: "",
    phone: "",
    dob: "",
    entryDate: "",
    isAdmin: false,
  });

  const {
    idDocumentNumber,
    email,
    password,
    passwordConfirm,
    name,
    surname,
    phone,
    dob,
    entryDate,
    isAdmin,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { member, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || member) {
      navigate("/");
    }
    dispatch(reset());
  }, [member, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.log("Passwords do not match.");
    } else {
      const memberData = {
        idDocumentNumber,
        email,
        password,
        passwordConfirm,
        name,
        surname,
        phone,
        dob,
        entryDate,
        isAdmin: false,
      };

      dispatch(register(memberData));
    }
  };

  if (isLoading) {
    return <div>Loading Data</div>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Register</h1>
        <p>Create an AFJ account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Your email'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Your phone'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Your password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='passwordConfirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='surname'
              name='surname'
              value={surname}
              placeholder='Your surname'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='idDocumentNumber'
              name='idDocumentNumber'
              value={idDocumentNumber}
              placeholder='Your ID Number or Passport'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='date'
              className='form-control'
              id='dob'
              name='dob'
              value={dob}
              placeholder='Your DOB'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='date'
              className='form-control'
              id='entryDate'
              name='entryDate'
              value={entryDate}
              placeholder='Your Entry Date'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
