import { Cervejarias } from './types';

let cervejariasCidade: Array<Cervejarias> = []
let cervejariasTipo: Array<Cervejarias> = []

const requisicaoCervejariasCidade = async ( cidade: string ) => {
    let url = `https://api.openbrewerydb.org/breweries?by_city=${cidade}&per_page=50`
        const res = await fetch(url)

        const cervejarias: Array<Cervejarias> = await res.json()
        cervejariasCidade = cervejarias.map( obj => ({name: obj.name, street: obj.street, city: obj.city, price: Math.random() * 10, brewery_type: obj.brewery_type}))
        console.log(cervejariasCidade)
}

const requisicaoCervejariasTipo = async ( tipo: string ) => {
    let url = `https://api.openbrewerydb.org/breweries?by_type=${tipo}&per_page=50`
        const res = await fetch(url)

        const cervejarias: Array<Cervejarias> = await res.json()
        cervejariasTipo = cervejarias.map( obj => ({name: obj.name, street: obj.street, city: obj.city, price: Math.random() * 10, brewery_type: obj.brewery_type}))
        console.log(cervejariasTipo)

}


const calculaMediaPrecosCidade = ( ) => {
    let soma = cervejariasCidade.reduce( (acumulado, atual) => {
        return acumulado + atual.price
    }, 0)
    let media = soma/cervejariasCidade.length
    console.log(`A média dos precos da cerveja na cidade é: ${media}`)
}


;(async () => {
    let menu = true
    let opcao = 0;
    let cidade: string | null;
    let tipo: string | null;

    while (menu) {
        opcao = parseInt(prompt(`Selecione a opção desejada:
        1 - Busca cervejarias por cidade (ex.: houston, san francisco)
        2 - Busca cervejarias por tipo (ex.: micro, nano, regional, brewpub)
        3 - Calcula a média de preços da cerveja por cidade
        4 - Sair
        `) as string)
    
        switch (opcao) {
            case 1:
                cidade = prompt(`Digite a cidade desejada:`)
                if(cidade){
                    await requisicaoCervejariasCidade(cidade);
                }
                break;
            case 2:
                tipo = prompt(`Digite o tipo de cervejaria:`)
                if(tipo){
                    await requisicaoCervejariasTipo(tipo);
                }
                break;
            case 3:
                cidade = prompt(`Digite a cidade desejada:`)
                if (cidade){
                    await requisicaoCervejariasCidade(cidade);
                    calculaMediaPrecosCidade();
                }
                break;
            case 4:
                menu = false;
                break;
            default:
                break;
            }
    }

})();

