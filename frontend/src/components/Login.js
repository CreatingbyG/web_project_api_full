import React, { useState } from "react";
import { authorize } from "../utils/auth";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      return;
    }
    authorize(values)
    .then((data) => {
      if (data.data.token){
        localStorage.setItem('jwt', data.data.token);
        setValues({
          email: '',
          password: ''
        });
        props.onAuthorize();
        navigate('/')
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
    });
  }

  return (
    <div>
      <div className="register-container">
        <h1 className="register-title">Inicia Sesion</h1>
        <form className="register_form" noValidate>
          <fieldset className="register__form-email">
            <input
            className="register__form_inputs"
              name="email"
              id="email"
              placeholder="Correo Electronico"
              value={values.email}
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="register__form-password">
            <input
            className="register__form_inputs"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
              required
            />
          </fieldset>
          <button onClick={handleSubmit} className="register__form-button" type="submit">Inicia Sesion</button>
        </form>
        <p className="direction-link">
          ¿Ya eres miembro? <a className="register__link" href="/signup">¿Aún no eres miembro? Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
