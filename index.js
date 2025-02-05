const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// Route for root page
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Route for notes collection
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// Route for fetching single resource
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

// Route for deleting resources
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const notes = notes.find(note => note.id !== id) // delete

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0

    return String(maxId + 1)
}

const isNameUnique = (name) => {

}
// Route for adding resources
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body) {
        return response.json(400).json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)
    
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})