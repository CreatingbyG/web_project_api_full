import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from '../components/Login.js';
import Register from '../components/Register.js';

const BASE_URL = 'https://register.nomoreparties.co';

export const register = ({email, password}) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Registro fallido');
    }
    return res.json();
  })
  .then((data) => {
    if (data.error){
      throw new Error(data.error);
    }
  });
}

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => {
        const errorText = response.status === 400
          ? 'No se ha proporcionado uno o más campos.'
          : response.status === 401
            ? 'No se ha encontrado al usuario con el correo electrónico especificado o la contrasena no coincide'
            : 'Ha ocurrido un error al iniciar sesión.';
        throw new Error(errorText);
      });
    }
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    return { success: true, data };
  })
  .catch(error => {
    throw new Error(error.message || 'Ha ocurrido un error al intentar conectar con el servidor.');
  });
};

export const getUserToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => {
        const errorText = response.status === 400
          ? 'Token no proporcionado o proporcionado en el formato incorrecto.'
          : response.status === 401
            ? 'El token provisto es inválido.'
            : 'Ha ocurrido un error al obtener la información del usuario.';
        throw new Error(errorText);
      });
    }
  })
  .then(data => {
    return { success: true, data };
  })
  .catch(error => {
    throw new Error(error.message || 'Ha ocurrido un error al intentar conectar con el servidor.');
  });
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<Login/>} />
    </Routes>
  );
};

export default AuthRoutes;