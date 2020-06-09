const express = require("express")
const server = express()
''
//Configurar pasta publica
server.use(express.static("public"))

//Ultilizando tamplate engine(permite criar fazer is e else, criar várias que serão enviada de nosso Back-end)
const nunjucks = require("nunjucks") 
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//Configurar caminhos da minha aplicação

//Página inicial (GET faz o pedido ao servidor)
server.get("/", (req, res) => { //REQ(requisição) RES(resposta)
  return res.render("index.html")
})

server.get("/create-point", (req, res) => { //REQ(requisição) RES(resposta)
  return res.render("create-point.html")
})

server.get("/search", (req, res) => { //REQ(requisição) RES(resposta)
  return res.render("search-results.html")
})

//Ligar o servidor
server.listen(3000)