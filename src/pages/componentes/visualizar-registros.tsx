import React, { useState, useEffect } from 'react';

// Definiendo el tipo para los registros
interface Registro {
  id: number; // Ajusta el tipo según tus datos, puede ser string si tus ID son textuales
  info: string;
}

const VisualizarRegistros = () => {
  // Definir el estado inicial para los registros
  const [registros, setRegistros] = useState<Registro[]>([]); // Usando el tipo definido

  useEffect(() => {
    // Simulando la carga de datos
    const datosCargados: Registro[] = [
      { id: 1, info: 'Ejemplo 1' },
      { id: 2, info: 'Ejemplo 2' }
    ];
    setRegistros(datosCargados);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Información</th>
        </tr>
      </thead>
      <tbody>
        {registros.map(registro => (
          <tr key={registro.id}>
            <td>{registro.id}</td>
            <td>{registro.info}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VisualizarRegistros;
