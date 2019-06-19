console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')


cotacoesForm.addEventListener('submit', (event) =>{

    mainMessage.innerText = 'Buscando'
    price.innerHTML = ''
    price_open.innerHTML = ''
    day_high.innerHTML = ''
    day_low.innerHTML =  ''
    
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMessage.innerText = 'O ativo deve ser informado'
        console.log('O ativo deve ser informado')
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mainMessage.innerText = `Alguma coisa deu errado`
            price.innerText = `${data.error.message} código ${data.error.code}`
            console.log(`Alguma coisa deu errado ${data.error.message} código ${data.error.code}`)
        }else{
            mainMessage.innerHTML = data.symbol
            price.innerHTML = '<img src="/img/price.png"> '+data.price
            price_open.innerHTML = '<img src="/img/open.png"> '+data.price_open
            day_high.innerHTML = '<img src="/img/high.png"> '+data.day_high
            day_low.innerHTML =  '<img src="/img/low.png"> '+data.day_low
            console.log(data)
        }  
        
    })
})
})