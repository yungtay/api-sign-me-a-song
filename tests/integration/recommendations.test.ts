import supertest from "supertest";
import app from "../../src/app";
import connection from '../../src/database'

describe("POST /recommendations", () => {
  it("should answer with status 200", async () => {
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toBe(200);
  });
});

describe("POST /recommendations/:id/upvote", () => {
  it("should aswer with status 200", async () => {
    const response = await supertest(app).post("/recommendations/10/upvote")
    expect(response.status).toBe(200)
  })  
})

describe("POST /recommendations/:id/downvote", () => {
  it("should aswer with status 200", async () => {
    const response = await supertest(app).post("/recommendations/10/downvote")
    expect(response.status).toBe(200)
  })
})

const body = {
    name: "Falamansa - Xote dos Milagres",
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
};

afterAll(() => {
  connection.end();
});