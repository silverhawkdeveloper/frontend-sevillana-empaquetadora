import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MyComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');
    let element = document.getElementById('h2');
    console.log(element.textContent);
  }, []);

  function handleClick() {
    navigate('/Home');
  }

  return (
    <div id='contenedor'>
      <button onClick={handleClick}>Navegar a la ruta nueva</button>
      <h2 id='h2'>Titulo h2</h2>
    </div>
  );
}
export default MyComponent

/*************************************************************/

const email = document.getElementById("email");
const contasenia = document.getElementById("contasenia");

let datos = {
  "email": "",
  "contrasenia": ""
};
datos.email = email.value;
datos.contrasenia = contasenia.value;

if (XMLHttpRequest) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let respuesta = xhr.responseText;
      console.log(respuesta);
    }
  };
  xhr.open("POST", "http://localhost:5000/auth/autenticado");
  xhr.send(JSON.stringify(datos));
}