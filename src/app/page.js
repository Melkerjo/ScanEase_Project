
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Välkommen till ScanEsase!
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>
            Sök närmaste butik<span>-&gt;</span>
          </h2>
          <p>Hitta din närmaste butik med ScanEsase här.</p>
        </div>

        <div className={styles.card}>
          <h2>
            Klicka på handla <span>-&gt;</span>
          </h2>
          <p>Logga in, skanna din butik och klicka på handla.</p>
        </div>

        <div className={styles.card}>
          <h2>
            Skanna varor<span>-&gt;</span>
          </h2>
          <p>Använd vår skanningsfunktion för att enkelt lägga till varor i din kundvagn.</p>
        </div>

        <div className={styles.card}>
          <h2>
            Betala ✅
          </h2>
          <p>Slutför din beställning genom att betala smidigt och säkert.</p>
        </div>
      </div>
    </main>
  );
}
