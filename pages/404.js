import Head from 'next/head';
import Link from 'next/link'
import { Fragment } from 'react';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
    return (
        <Fragment>
            <Head>
                <title>Oops! Página não encontrada</title>
            </Head>
            <div id={styles.notfound_container}>
                <div className={styles.notfound}>
                    <div className={styles.notfound_404}>
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Página não encontrada</h2>
                    <p>Desculpe, mas a página que você está procurando não existe, foi
                        removida ou está temporariamente indisponível.</p>
                    <Link href='/'>
                        <a>Continue navegando</a>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}