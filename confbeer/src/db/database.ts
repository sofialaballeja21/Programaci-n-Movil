// Conexión a SQLite

import * as SQLite from "expo-sqlite";
import { Conference } from "../types/Conference";

const db = SQLite.openDatabaseSync("conferences.db");

// Crear tabla
export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS conferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      speaker TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      image TEXT
    );
  `);
};

// Obtener todas las conferencias
export const getConferences = async (): Promise<Conference[]> => {
  const rows = await db.getAllAsync<Conference>("SELECT * FROM conferences;");
  return rows;
};

// Obtener conferencia por ID
export const getConferenceById = async (id: number): Promise<Conference | null> => {
  const row = await db.getFirstAsync<Conference>(
    "SELECT * FROM conferences WHERE id = ?;",
    [id]
  );
  return row ?? null;
};

// Insertar conferencia
export const insertConference = async (
  title: string,
  speaker: string,
  startTime: string,
  endTime: string,
  image: string
) => {
  await db.runAsync(
    "INSERT INTO conferences (title, speaker, startTime, endTime, image) VALUES (?, ?, ?, ?, ?);",
    [title, speaker, startTime, endTime, image]
  );
};

// Seed de datos iniciales
export const seedConferences = async () => {
  await initDB();

  const row = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM conferences;"
  );

  if (row && row.count === 0) {
    const dummyData = [
      ["Malta y tradición", "Ana Gómez", "11:00", "12:00", "tractor.jpeg"],
      ["Lúpulo argentino", "Carlos Díaz", "12:00", "13:00", "vasosBeer.jpeg"],
      ["Alimentos y Cervezas", "Laura Fernández", "13:00", "14:00", "burritoBeer.png"],
      ["Cervezas ácidas", "Diego López", "14:00", "15:00", "cervezas.jpg"],
      ["Maridaje con cerveza", "María Torres", "15:00", "16:00", "7colinasLatas.jpeg"],
      ["Proceso de fermentación", "Pedro Sánchez", "16:00", "17:00", "Byggvir.jpeg"],
      ["Cultura cervecera", "Sofía Martínez", "17:00", "18:00", "lagash.jpg"],
      ["Microcervecerías", "Ricardo Gómez", "18:00", "19:00", "drakkar.jpeg"],
      ["Innovación en cerveza artesanal", "Valeria Ramírez", "19:00", "20:00", "cerveceros.png"],
    ];

    for (const conf of dummyData) {
      await db.runAsync(
        "INSERT INTO conferences (title, speaker, startTime, endTime, image) VALUES (?, ?, ?, ?, ?);",
        conf
      );
    }
    console.log("✅ Seed de conferencias completado");
  }
};
