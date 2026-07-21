function Contador() {
  const [valor, setValor] = useState(0);
  const [historial, setHistorial] = useState([]);

  const sumar = () => {
    const nuevoValor = valor + 1;
    setValor(nuevoValor);
    setHistorial([...historial, nuevoValor]);
  };

  return (
    <div>
      <p>Valor actual: {valor}</p>
      <button onClick={sumar}>Sumar</button>
      <ul>
        {historial.map((click, i) => (
          <li key={i}>Click #{click}</li>
        ))}
      </ul>
    </div>
  );
}

// 0 lineas, En el paradigma declarativo no escribes cómo actualizar el DOM, solo describes qué debe mostrarse en función del estado.