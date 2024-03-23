const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/status', (request, response) => response.json({clients: clients.length}))

const PORT = 3003

let clients = []
let facts = []

app.listen(PORT, () => {
    console.log(`Facts Events service listening at localhost:${PORT}`)
})


const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
}
function eventsHandler(request, response, next){

    response.writeHead(200, headers)

    const data = `data: ${JSON.stringify(facts)}\n\n`
    // \n\n means end of event

    response.write(data)

    const clientId = Date.now()

    const newClient = {
        id: clientId,
        response
    }
    
    clients.push(newClient)

    request.on('close', () => {
        console.log(`${clientId} Connection closed`)
        clients = clients.filter(client => client.id !== clientId)
    })
}

app.get('/events', eventsHandler)



function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }
  
  async function addFact(request, response, next) {
    const newFact = request.body;
    facts.push(newFact);
    response.json(newFact)
    return sendEventsToAll(newFact);
  }
  
  app.post('/fact', addFact);