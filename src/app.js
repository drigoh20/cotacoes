const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações!',
        author: 'Rodrigo Franck'

    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Rodrigo Franck'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Rodrigo Franck'
        
    })
})

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({
           error: {
               message: 'O ativo deve ser informado como query parameter',
               code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body)=>{
        if(err){
            const {message} = err
            const error= {
                   message,
                   code: err.code              
             }
            return res.status(err.code).json({error})
        }else{
            res.status(200).json(body)
        }
        
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        title: '404',
        author: 'Rodrigo Franck',
        errorMessage : 'Não existe página depois de /help'
    })
})

app.get('*', (req, res) => {
    res.render('404', { 
        title: '404',
        author: 'Rodrigo Franck',
        errorMessage: 'Página não encontrada'
    })
})

app.listen(3000, ()=> {
    console.log('server is up on port 3000')
})

