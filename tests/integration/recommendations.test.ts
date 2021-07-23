import supertest from "supertest";
import app from "../../src/app";
import connection from '../../src/database'
import * as recommendationsFactorie from '../../src/aux/factories/recommendationsFactorie'
const agent = supertest(app)

describe("POST /recommendations", () => {
  it("should answer with status 200 if everything is valid", async () => {
    const response = await agent.post("/recommendations").send(recommendationsFactorie.body);
    expect(response.status).toBe(200);
  });

  it("should answer with status 400 when the when youtubeLink is not present", async () => {
    const response = await agent.post("/recommendations").send({name: "Falamansa - Xote dos Milagress"});
    expect(response.status).toBe(400)
  })

  it("should answer with status 400 when the when name is not present", async () => {
    const response = await agent.post("/recommendations").send({youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"});
    expect(response.status).toBe(400)
  })

  it("should answer with status 401 when the when name is not string", async () => {
    const response = await agent.post("/recommendations").send({...recommendationsFactorie.body, name: 5});
    expect(response.status).toBe(401)
  })

  it("should answer with status 401 when the when name is not string", async () => {
    const response = await agent.post("/recommendations").send({...recommendationsFactorie.body, youtubeLink: "https://www.globo.com/watch?v=chwyjJbcs1Y"});
    expect(response.status).toBe(401)
  })
});

describe("POST /recommendations/:id/upvote", () => {
  it("should answer with status 200 if everything is valid", async () => {
    await recommendationsFactorie.addRecommendation()
    const response = await agent.post("/recommendations/1/upvote")
    expect(response.status).toBe(200)
  })
  
  it("should answer with status 404 if the id of the recommendations don't exist", async () => {
    const response = await agent.post("/recommendations/999/upvote")
    expect(response.status).toBe(404)
  })  
})

describe("POST /recommendations/:id/downvote", () => {
  it("should answer with status 200 if everything is valid", async () => {
    await recommendationsFactorie.addRecommendation()
    const response = await agent.post("/recommendations/1/downvote")
    expect(response.status).toBe(200)
  })

  it("should answer with status 404 if the id of the recommendations don't exist", async () => {
    const response = await agent.post("/recommendations/999/downvote")
    expect(response.status).toBe(404)
  })

  it("should respond with 404 status after trying to access a recommendation that just passed -5 downvotes", async () => {
    await recommendationsFactorie.addRecommendation()
    await agent.post("/recommendations/9/downvote")
    const response = await agent.post("/recommendations/9/downvote")
    expect(response.status).toBe(404)
  })
})

describe("GET /recommendations/random", () => {
  it("should answer with one random object if everything is valid", async () => {
    await recommendationsFactorie.addRecommendation()
    const response = await agent.get("/recommendations/random")
    expect(response.body).toStrictEqual(expect.objectContaining({"id": expect.any(Number), "name": expect.any(String), "votes": expect.any(Number), "youtubeLink": expect.any(String)})
  )})
})

describe("GET /recommendations/top/:amount", () => {
  it("should answer with a array of objects with the number of the amount if everything is valid", async () => {
    await recommendationsFactorie.addRecommendation()
    const amount = 5
    const response = await agent.get("/recommendations/top/" + amount)
    expect(response.body).toStrictEqual(expect.arrayContaining([expect.objectContaining({"id": expect.any(Number), "name": expect.any(String), "votes": expect.any(Number), "youtubeLink": expect.any(String)})])
  )})

  it("should answer with status 404 if there's no recommendations", async () => {
    const response = await agent.get("/recommendations/top/4")
    expect(response.status).toBe(404)
  })

  it("should answer with status 400 if the amount is less than 1", async () => {
    await recommendationsFactorie.addRecommendation()
    const response = await agent.get("/recommendations/top/0")
    expect(response.status).toBe(400)
  })
})

afterAll(() => {
  connection.end();
});

afterEach(async () => {
  await recommendationsFactorie.restartTable()
})