import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { register } from "../utils/auth";
import InfoTooltip from '../components/InfoTooltip';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    isSuccess: false,
    message: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones...

    register(values)
      .then((res) => {
        // Manejo del registro exitoso
        setTooltipContent({
          isSuccess: true,
          message: '¡Correcto! Ya estás registrado.'
        });
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        // Manejo de errores de registro desde el servidor
        setTooltipContent({
          isSuccess: false,
          message: 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'
        });
        setIsTooltipOpen(true);
      });
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
    // Si el registro fue exitoso, navega a 'signin'. De lo contrario, permanece en la página.
    if (tooltipContent.isSuccess) {
      navigate('/signin');
    }
  };

  useEffect(() => {
    // Siempre que tooltipContent cambie y el tooltip esté abierto, verifica el estado del registro
    if (isTooltipOpen) {
      if (tooltipContent.isSuccess) {
        // Si el registro fue exitoso, navega a 'signin' después de un breve retraso
        setTimeout(() => navigate('/signin'), 6500); 
      }
    }
  }, [isTooltipOpen, tooltipContent, navigate]);
  return (
    <div>
      <div className="register-container">
        <h1 className="register-title">Regístrate</h1>
        <form className="register_form" noValidate onSubmit={handleSubmit}>
        <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeTooltip}
        isSuccess={tooltipContent.isSuccess}
        message={tooltipContent.message}
      />
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
          <button onClick={handleSubmit} className="register__form-button" type="submit">Registrate</button>
        </form>
        <p className="direction-link">
          ¿Ya eres miembro? <a className="register__link" href="/signin">¿Ya eres miembro? Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
