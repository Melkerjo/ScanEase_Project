
import styles from "./page.module.css";


export default function MyOrder() {

    const ORDERLIST = [
        { orderdate: '2024-04-01', amountOfProducts: '10', amount: '549'},
        { orderdate: '2024-04-02', amountOfProducts: '20', amount: '799'},
        { orderdate: '2024-04-03', amountOfProducts: '15', amount: '699'},
        { orderdate: '2024-04-04', amountOfProducts: '8', amount: '399'},
        { orderdate: '2024-04-05', amountOfProducts: '12', amount: '499'},
        { orderdate: '2024-04-06', amountOfProducts: '25', amount: '899'},
        { orderdate: '2024-04-07', amountOfProducts: '18', amount: '749'},
        { orderdate: '2024-04-08', amountOfProducts: '14', amount: '599'},
    ];


    return(
        <main className={styles.main}>
            <div className={styles.mainBox}>
                <div className={styles.container}>
                    <h2 className={styles.mainText}>Beställningslista</h2>
                        <div className={styles.orderList}>
                            {ORDERLIST.map((order, index) => (
                            <div key={index} className={styles.order}>
                                <p className={styles.date}>Orderdatum: {order.orderdate}</p>
                                <p className={styles.amountOfProducts}>Antal produkter: {order.amountOfProducts}</p>
                                <p className={styles.amount}>Belopp: {order.amount} kr</p>
                            </div>
                            ))}
                        </div>
                </div>         
            </div>
        </main>
    );    
}