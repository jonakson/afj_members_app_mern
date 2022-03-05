import { useState, useEffect } from "react";

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
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

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
