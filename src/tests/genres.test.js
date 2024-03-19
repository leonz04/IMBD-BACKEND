const request =require('supertest');
const app = require('../app');


let id;

test('GET /genre should be return status 200', async() => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
 })

 test ("POST /genres should be create an genre",async()=>{
    const body={
        name:"name genre"
    }

    const res= await request(app).post('/genres').send(body);
    id=res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);

});

test("PUT /genres/:id should be update an genre", async()=>{
    const body={
        name:"name genre update4"
       
    }
    const res= await request(app).put(`/genres/${id}`).send(body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /genres/:id should be delete an genre", async()=>{
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204)
});

