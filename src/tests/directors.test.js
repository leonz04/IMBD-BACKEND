const request =require('supertest');
const app = require('../app');


let id;

test('GET /director should be return status 200', async() => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
 })

 test ("POST /directors should be create an director",async()=>{
    const body={
        firstName:"directorFirstName",
        lastName:"directorLastName",
        nationality:"Colombian",
        image:"imageUrl",
        birthday:"1990/01/01"
    }

    const res= await request(app).post('/directors').send(body);
    id=res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.image).toBeDefined();

});

test("PUT /directors/:id should be update an director", async()=>{
    const body={
        firstName:"director firstName update",
       
    }
    const res= await request(app).put(`/directors/${id}`).send(body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /directors/:id should be delete an director", async()=>{
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204)
});

