import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

type FormData = {
  id?: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
};

export function dashboard() {
  const [formData, setFormData] = useState<FormData>({
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
          <Button variant="contained" sx={{width:"400px"}}>
        Guardar
      </Button>
    </Box>
  </>
  );
}
export default dashboard
