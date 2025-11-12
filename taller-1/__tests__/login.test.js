import { loginUser } from "../src/controllers/user.controller.js";
import supertest from "supertest"; // nos permite probar peticiones
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { userModel } from "../src/models/users.model.js";
import app from "../app.js";

describe("prueba funcion login", () => {
  // casos de prueba:

  const testUser = {
    fullName: "pepita",
    email: "pepita@gmail.com",
    password: "123",
  };

  //antes de cada caso de prueba
  beforeEach(async () => {
    await userModel.deleteMany({});
  });
  //instrucciones al final de todos los casos de prueba -> cerrar la conexion a la base de datos

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // 1. caso existoso inicio de sesion

  it("inicio de sesion valido", async () => {
    const codedPassword = await bcryptjs.hash(testUser.password, 10);
    await userModel.create({ ...testUser, password: codedPassword });

    const response = await supertest(app).post("/iniciarSesion").send({
      emailLogin: "pepita@gmail.com",
      passwordLogin: "123",
    });

    expect(response.statusCode).toBe(200);
  });

  //2. caso fallido de inicio de sesion usuario no resgistrado

  it("inicio de sesion invalido correo invalido ", async () => {
    const codedPassword = await bcryptjs.hash(testUser.password, 10);
    await userModel.create({ ...testUser, password: codedPassword });

    const response = await supertest(app).post("/iniciarSesion").send({
      emailLogin: "pepito@gmail.com",
      passwordLogin: "123",
    });

    expect(response.statusCode).toBe(404);
  });

  //caso fasllido usuario contrasena incorrecta

  
  it("inicio de sesion invalido contrasena incorrecta ", async () => {
    const codedPassword = await bcryptjs.hash(testUser.password, 10);
    await userModel.create({ ...testUser, password: codedPassword });

    const response = await supertest(app).post("/iniciarSesion").send({
      emailLogin: "pepita@gmail.com",
      passwordLogin: "1234",
    });

    expect(response.statusCode).toBe(401);
  });

});
