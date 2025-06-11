import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()

const db = new Sequelize( process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: false
        }
    }
})

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue.bold('Conexion exitosa a la base de datos'));   
    } catch (error) {
        // console.log(error);
        console.log( colors.red.bold('Fallo la conexion'));
    }
}
