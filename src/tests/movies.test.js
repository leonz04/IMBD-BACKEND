const request =require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');


let id;

test('GET /movie should be return status 200', async() => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
 })

 test ("POST /movies should be create an movie",async()=>{
    const body={
        name:"nameMovie",
        image:"imageUrl",
        synopsis: "bla bla bla",
        releaseYear:1990
    }

    const res= await request(app).post('/movies').send(body);
    id=res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.image).toBeDefined();

});

test("PUT /movies/:id should be update an movie", async()=>{
    const body={
        name:"nameMovie update",
       
    }
    const res= await request(app).put(`/movies/${id}`).send(body);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('POST /movies/:id/genres should be insert a genres in a one movie', async () => {
    const genre = await Genre.create({name:"Fantasy"});
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
        console.log(res.body)
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Fantasy')
});

test('POST /movies/:id/directors should be insert a directors in a one movie', async () => {
    const director = await Director.create({
        firstName:"directorFirstName",
        lastName:"directorLastName",
        nationality:"directorNationality",
        image:"directorImg",
        birthday:"1990/01/01"


    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
        console.log(res.body)
    await director.destroy();
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('directorFirstName')
    expect(res.body[0].lastName).toBe('directorLastName')
    expect(res.body[0].nationality).toBe('directorNationality')
    expect(res.body[0].image).toBe('directorImg')

});

test('POST /movies/:id/actors should be insert an actors in a one movie', async () => {
    const actor = await Actor.create({
        firstName:"actorFirstName",
        lastName:"actorLastName",
        nationality:"actorNationality",
        image:"actorImg",
        birthday:"1990/01/01"


    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
        console.log(res.body)
    await actor.destroy();
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('actorFirstName')
    expect(res.body[0].lastName).toBe('actorLastName')
    expect(res.body[0].nationality).toBe('actorNationality')
    expect(res.body[0].image).toBe('actorImg')

});


test("DELETE /movies/:id should be delete an movie", async()=>{
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204)
});



