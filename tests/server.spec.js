const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => { 
  
    it("Devuelve un statusCode 200, además recibiendo un Array de al menos 1 objeto", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
    
    it("Devuelve un status 404 al intentar eliminar un café que no existe", async () => {
        const response = await request(server)
            .delete("/cafes/7") 
            .set("Authorization", "Bearer token");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("No se encontró ningún cafe con ese id");
    });
    
    it("Agrega un nuevo café y devolver un status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);        
    });
    
    it("Devuelve un status 400 si el id del parámetro no coincide con el id del payload", async () => {
        const cafeActualizado = { id: 5, nombre: "Latte Grande" };
        const response = await request(server)
            .put("/cafes/1") 
            .send(cafeActualizado);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
    

});
