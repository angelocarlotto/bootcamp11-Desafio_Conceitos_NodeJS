const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url,title,techs}=request.body;
  const newObj={url,title,techs};
  newObj.id=uuid();
  newObj.likes=0;
  repositories.push(newObj);
  return response.json(newObj);
});

app.put("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const {title,url,techs}=request.body;
  const indexToUpdate=repositories.findIndex(e=>e.id===id);
  if(indexToUpdate>=0){
    const projectUpdated={
      id:repositories[indexToUpdate].id,
      title:title,
      url:url,
      techs:techs,
      likes:repositories[indexToUpdate].likes
    };
    repositories[indexToUpdate]=projectUpdated;
    return response.json(projectUpdated);
  }

  return response.status(400).json({error:`repository not found`});
});

app.delete("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const indexToDelete=repositories.findIndex(e=>e.id===id);

  if(indexToDelete>=0){
      repositories.splice(indexToDelete,1);
      return response.status(204).send();
  }

  return response.status(400).json({error:`repository not found`});
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}=request.params;
  const indexToUpdate=repositories.findIndex(e=>e.id===id);
  if(indexToUpdate>=0){
    repositories[indexToUpdate].likes=repositories[indexToUpdate].likes+1;
    return response.json(repositories[indexToUpdate]);
  }
  return response.status(400).json({error:`repository not found`});
});

module.exports = app;
