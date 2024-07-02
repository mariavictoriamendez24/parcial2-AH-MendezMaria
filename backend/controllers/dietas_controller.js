// dietas_controller.js
import Dieta from "../models/dietas_model.js";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import dietasRoutes from "../routes/dietas_routes.js";

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Conectados a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/dietas", dietasRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

async function getDietas() {
    let dietas = await Dieta.find();
    return dietas;
}

async function createDietas(body) {
    let dieta = new Dieta({
        titulo: body.titulo,
        descripcion: body.descripcion,
        ingredientes: body.ingredientes,
    });
    return await dieta.save();
}

async function updateDietas(body, titulo) {
    try {
        console.log(body);
        console.log(titulo);

        let dietaActualizada = await Dieta.findOneAndUpdate(
            { "titulo": titulo },
            {
                $set: {
                    titulo: body.titulo,
                    descripcion: body.descripcion,
                    ingredientes: body.ingredientes,
                }
            },
            { new: true } 
        );

        if (!dietaActualizada) {
            throw new Error(`No se encontró la dieta con título ${titulo}`);
        }

        return dietaActualizada;
    } catch (error) {
        console.error("Error al actualizar la dieta:", error);
        throw error; 
    }
}

async function deleteDietas(id) {
    try {
        let dietaEliminada = await Dieta.findByIdAndDelete(id);
        if (!dietaEliminada) {
            throw new Error(`No se encontró la dieta con ID ${id}`);
        }
        return dietaEliminada;
    } catch (error) {
        console.error("Error al eliminar la dieta:", error);
        throw error;
    }
}

export { getDietas, createDietas, updateDietas, deleteDietas };
