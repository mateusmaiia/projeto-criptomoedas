import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'


export function Home(){
    return(
        <main className={styles.container}>
            <form className={styles.form}>
                <input 
                    placeholder='Digite o simbolo da moeda: BTC...' 
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
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda" id='tbody'>
                            <Link className={styles.link} to='/detail/btc'>
                                <span>Bitcoin</span> | BTC
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-label="Mercado">
                            R$ 19293
                        </td>
                         <td className={styles.tdLabel} data-label="Preço">
                            R$ 40.321
                        </td>
                        <td className={styles.tdLoss} data-label="Volume">
                            <span>-5.3</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>


    )
}