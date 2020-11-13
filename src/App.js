import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImg from './components/ListadoImg';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(5); 
  useEffect(() => {
    
    const consultarAPI = async () => {
      if (busqueda === '') return ;

      const imagenesPorPagina = 30;
      const keyAPI = '18668697-f8419e50da9bd1a43cf0e81fd';
      const url = `https://pixabay.com/api/?key=${keyAPI}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
      
      //Calcula el total e paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalpaginas(calcularTotalPaginas);
      //Mueve pantalla hacia arriba
      const jumbotron =document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultarAPI();
  }, [busqueda, paginaactual])

  const paginaAnterior = () =>{
    const nuevaPagActual = paginaactual - 1;

    if(nuevaPagActual === 0) return;
    setPaginaactual(nuevaPagActual);
  }
  const paginaSiguiente = ()=>{
    const nuevaPagActual = paginaactual + 1;
    if(nuevaPagActual > totalpaginas) return;
    setPaginaactual(nuevaPagActual);
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imágenes
        </p>
        <Formulario
          setBusqueda = {setBusqueda}
        />
        
      </div>
      <div className="row justify-content-center">
        <ListadoImg
          imagenes={imagenes}
        />
        {(paginaactual === 1) ? null :
          <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
          >&laquo; Anterior </button>
        }
        {(paginaactual === totalpaginas) ? null :
          <button
          type="button"
          className="btn btn-info "
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
