import styles from "./page.module.css";

export default function Contact() {
  return (
    <main className={styles.main}>
      <section className={styles.contactSection}>
        <h2>Kontaktinformation</h2>
        <p>
          För frågor och support, kontakta oss via e-post på{" "}
          <a href="mailto:info@scanease.com">info@scanease.com</a> eller ring
          oss på +46 123 456 789.
        </p>
      </section>

      <section className={styles.faqsSection}>
        <h2>Frågor & Svar</h2>
        <div className={styles.question}>
          <h3>Hur handlar jag?</h3>
          <p>
            För att handla, logga in och klicka på den butiken du vill handla ifrån. Skanna önskad produkt med mobilkameran för att lägga
            till den i din varukorg. Gå sedan till kassan för att slutföra
            din beställning.
          </p>
        </div>
        <div className={styles.question}>
          <h3>Hur skannar jag varor?</h3>
          <p>
            För att skanna varor, klicka på handla och tilåt kamera, rikta sedan kameran mot
            streckkoden på produkten. Aplikationen kommer att skanna streckkoden och
            lägga till produkten i din varukorg automatiskt.
          </p>
        </div>
      </section>
    </main>
  );
}
