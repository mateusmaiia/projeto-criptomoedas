import { FormEvent, useEffect, useState} from 'react'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'


export function Home(){

    interface CoinsProps{
        name: string;
        delta_24: string;
        price: string;
        symbol: string;
        volume_24h: string;
        market_cap: string;
        formatedPrice: string;//as duas novas props
        formatedMarket: string//as duas novas props
    }

    interface DataProps{
        coins: CoinsProps[]
    }

    const [coins, setCoins] = useState<CoinsProps[]>([])
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        function getData(){
            fetch('https://sujeitoprogramador.com/api-cripto/?key=d44eb487d7c73f6e&pref=BRL')
            .then(response => response.json())
            .then((data: DataProps) => {
                const coinsData = data.coins.slice(0, 15); //recebe apenas 15 moedas

                //FUNÇÃO PRA FORMATAR MOEDA
                const price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                //PERCORRE TODA A LISTA DE MOEDAS E ADICIONA DUAS PROPIEDADES A MAIS AO OBJETO COINSDATA
                const formatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap))
                    }

                    return formated;
                })

                setCoins(formatResult)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        // console.log(coins.delta_24)
        getData()
    }, [])

    function handleSubmit(e: FormEvent){ //navegando o usuario de forma imperativa com base no que ele digita
        e.preventDefault()
        if(inputValue === "") return //se o input value for vazio, vai para a função

        navigate(`/detail/${inputValue}`) //senão vai 
    }

    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                    placeholder='Digite o simbolo da moeda: BTC...' 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type='submit'>
                    <BiSearch size={30} color="#fff"/>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Valor mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                    </tr>
                </thead>

                <tbody>
                    {coins.map(coin => (
                        <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda" id='tbody'>
                            <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-label="Mercado">
                            {coin.formatedMarket}
                        </td>
                         <td className={styles.tdLabel} data-label="Preço">
                            {coin.formatedPrice}
                        </td>
                        <td className={Number(coin?.delta_24) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                            <span>{coin.delta_24}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </main>


    )   
}