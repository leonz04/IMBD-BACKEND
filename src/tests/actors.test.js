const request =require('supertest');
const app = require('../app');


let id;

test('GET /actor should be return status 200', async() => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
 })

 test ("POST /actors should be create an actor",async()=>{
    const body={
        firstName:"actorFirstName",
        lastName:"actorLastName",
        nationality:"Colombian",
        image:"imageUrl",
        birthday:"1990/01/01"
    }

    const res= await request(app).post('/actors').send(body);
    id=res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.image).toBeDefined();

});

test("PUT /actors/:id should be update an actor", async()=>{
    const body={
        firstName:"actor firstName update",
       
    }
    const res= await request(app).put(`/actors/${id}`).send(body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /actors/:id should be delete an actor", async()=>{
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204)
});

