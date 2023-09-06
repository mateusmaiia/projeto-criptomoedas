import { useState, useEffect} from 'react'
import styles from "./detail.module.css"
import { useParams, useNavigate} from 'react-router-dom'

interface CoinProps{
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowPrice: string;
    formatedHighPrice: string;
    numberDelta: number;
    error?: string;
}

export function Detail(){
    const { cripto } = useParams()
    const [detail, setDetail] = useState<CoinProps>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=d44eb487d7c73f6e&pref=BRL&symbol=${cripto}`)
            .then(response => response.json())
            .then((data: CoinProps ) => {
                
            if(data.error){
                navigate("/")
            }

            const price = Intl.NumberFormat("pt-BR",{
                style: 'currency',
                currency: "BRL"
            })

            const resultData = {
                ...data,
                formatedPrice: price.format(Number(data.price)),
                formatedMarket:  price.format(Number(data.market_cap)),
                formatedLowPrice: price.format(Number(data.low_24h)),
                formatedHighPrice: price.format(Number(data.high_24h)),
                numberDelta: parseFloat(data.delta_24h.replace(",", "."))
            }

            setDetail(resultData)
            setLoading(false)

            })

        }

        getData()
    }, [cripto, navigate])

    //se estiver carregando vai mostrar isso aqui, quando carregar o useState loading e mudar para false, dai sim vai exibir o comp de fato
    if(loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>Carregando informações...</h4>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.center}>{detail?.name}</h1>
            <p className={styles.center}>{detail?.symbol}</p>

            <section className={styles.content}>
                <p>
                    <strong>Preço:</strong>{detail?.formatedPrice}
                </p>
                <p>
                    <strong>Maior preço 24h:</strong> {detail?.formatedHighPrice}
                </p>
                <p>
                    <strong>Menor preço 24h:</strong> {detail?.formatedLowPrice}
                </p>
                <p>
                    <strong>Delta 24h:</strong>
                    <span className={detail?.numberDelta && detail?.numberDelta > 0 ? styles.profit : styles.loss }>
                      {detail?.delta_24h}
                    </span>
                </p>
                <p>
                    <strong>Valor total de mercado:</strong>     {detail?.formatedMarket} 
                </p>
            </section>
        </div>
    )
}