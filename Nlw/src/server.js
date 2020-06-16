const express = require("express")
const server = express()

//Pega o banco de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"))

// Habilitar o usu do REQ BODY
server.use(express.urlencoded({ extended: true }))

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

  // req.queryQuery String da nossa url
  //console.log(req.query)

  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

  console.log("BODEYYYYYYYY : ",req.body)

  // Inserir dados no banco de dados
  //Inserir dados na tabela
  const query = `
INSERT INTO places (image, name, address, address2, state, city, items) 
VALUES (?, ?, ?, ?, ?, ?, ?);`

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }
    console.log('Cadastrado com sucesso!')
    console.log(this)

    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData) // se coloca a function com () ela é executada na hora */



})

server.get("/search", (req, res) => { //REQ(requisição) RES(resposta)
  
  const search = req.query.search
    
    if(search == ""){
      //Pesquisa Vázia
    return res.render("search-results.html", {total: 0 })
    }


  
  //Pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length

    //Mostrar a página html com os dados do Banco
    return res.render("search-results.html", { places: rows, total: total })

  })


})

//Ligar o servidor
server.listen(3000)