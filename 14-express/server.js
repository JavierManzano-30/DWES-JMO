import express from 'express';

//Create Server
const app = express();

app.get('/books', (req, res) => {
    console.log('!!!!!!')
    res.send('!!!!!!')
})

app.post('/books', (req, res) => {
    console.log('!!!!!!')
    res.send('!!!!!!')
})

app.use('/authors', (req, res) => {
    console.log('??????')
    res.send('??????')
})

app.use((req, res) => {
    console.log('Not Found')
    res.status(404)
    res.send('Not Found')
})

app.listen(3000, () => {
    console.log('Server ready ar port 3000');
});