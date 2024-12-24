import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>React 19 Features Examples</h1>
        <nav className={styles.navigation}>
          <Link href="/ex1" className={styles.link}>
            useTransition
          </Link>
          <Link href="/ex2" className={styles.link}>
            비동기 + useTransition (React 19)
          </Link>
          <Link href="/ex3" className={styles.link}>
            useActionState (React 19)
          </Link>
          <Link href="/ex4" className={styles.link}>
          useFormStatus (React 19)
          </Link>
          <Link href="/ex5" className={styles.link}>
          useFormStatus with FormData Example
          </Link>
          <Link href="/ex6" className={styles.link}>
          useOptimistic Example (React 19)
          </Link>
          <Link href="/ex7" className={styles.link}>
          use Example (promise)
          </Link>
          <Link href="/ex8" className={styles.link}>
          use Example (context)
          </Link>
        </nav>
      </main>
    </div>
  );
}