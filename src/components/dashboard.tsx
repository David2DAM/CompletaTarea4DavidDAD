import React, { useState } from "react";
import { Box, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { data } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type FormData = {
  id: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
};

export function dashboard() {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    nombre: "",
    marca: "",
    tipo: "",
    precio: 0
  });

/*TO DO */  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    //Toma cualquier evento que cambien en el html 
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "precio" || name === "id" ? Number(value) : value,
    });
    //Lo que hago aqui es que si es la variable id o precio [name]: name === "precio" || name === "id", esto es una estructura if 
    // que son numbers se asegura de que lo sean, es un control de errores, evita que introduzcas cosas que no sean numeros 
  };

    /*  FUNCION QUE INSERTA EN LA BD */
  const handleInsert = async () => {
    const { nombre, marca, tipo, precio } = formData;

  const response = await fetch(
  `http://localhost:3030/addItem?nombre=${nombre}&marca=${marca}&tipo=${tipo}&precio=${precio}`
);


    const data = await response.json();

    if (data > 0) {
      alert("Datos guardados con éxito");
    } else {
      alert("No se pudo insertar en la base de datos");
    }
  };

  const [tableData, setTableData] = useState<FormData[]>([])
  const handleSelect = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems'); // endpoint
      const result = await response.json();
      setTableData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

const handleDelete = async () => {
  const id = formData.id;
  try {
    const response = await fetch(
      `http://localhost:3030/deleteItem?id=${id}`
    );
    const result = await response.json();
    setTableData(result.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  return (
    <>
    <Box
      sx={{
        width: "600",
        display: "flex",
        gap: 2,
        marginTop: 3,
      }}
    >
      <TextField
        label="ID (opcional)"
        type="number"
        name="id"
        value={formData.id ?? ""}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Marca"
        name="marca"
        value={formData.marca}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Tipo"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Precio"
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        fullWidth
      />
        
      
    </Box >
    <Box sx={{padding:"15px"}}>
          <Button variant="contained" sx={{width:"400px"}} onClick={handleInsert}>
        Guardar
      </Button>
    </Box>
        <Box sx={{padding:"15px"}}>
          <Button variant="contained" sx={{width:"400px"}} onClick={handleSelect}>
        Seleccionar
      </Button>
    </Box>
    
<TableContainer component={Paper} aria-label="Tabla david">
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell> 
        <TableCell>Nombre</TableCell>
        <TableCell align="right">Marca</TableCell>
        <TableCell align="right">Tipo</TableCell>
        <TableCell align="right">Precio</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tableData?.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.id} 
          </TableCell>
          <TableCell>{row.nombre}</TableCell>
          <TableCell align="right">{row.marca}</TableCell>
          <TableCell align="right">{row.tipo}</TableCell>
          <TableCell align="right">{row.precio}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


<Box sx={{ padding: "15px" }}>
  <Button
    variant="contained"
    sx={{ width: "400px" }}
    onClick={handleDelete}
    startIcon={<DeleteForeverIcon />}
  >
    
  </Button>
</Box>

  </>
  );
}
export default dashboard
