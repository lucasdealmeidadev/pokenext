import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Card.module.css';

export default function Card({ pokemon }) {
    const { id, name } = pokemon;

    return (
        <div className={styles.card}>
            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/${id}.png`}
                width='120'
                height='120'
                alt={name}
            />
            
            <p className={styles.id}>#{id}</p>
            <h3 className={styles.title}>{name}</h3>
            
            <Link href={`/pokemon/${id}`}>
                <a className={styles.btn}>Detalhes</a>
            </Link>
        </div>
    );
}