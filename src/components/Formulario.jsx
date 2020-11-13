import React,{useState} from 'react'
import Error from './Error';

const Formulario = ({setBusqueda}) => {


  //States
  const [termino, setTermino] = useState('');
  const [error, setError] = useState(false);

  //Buscar imagenes
  const buscarImagenes = e => {
    e.preventDefault();
    //Validar
    if(termino.trim() === ''){
      setError(true);
      return;
    }
    setError(false);
    //Enviar el termino al componente principal
    setBusqueda(termino);

  };



  return (  
    <form
      onSubmit={buscarImagenes}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input 
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o cafe"
            onChange={e => setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input 
            type="submit"
            className="btn btn-lg btn-danger btn-block"
          />
        </div>
      </div>

      {error ? <Error mensaje="Agrega un termino de búsqueda"/> : null}
    </form>
  );
}
 
export default Formulario;