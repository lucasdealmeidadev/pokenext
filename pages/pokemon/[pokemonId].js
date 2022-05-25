import Image from 'next/image';
import styles from '../../styles/Pokemon.module.css';

export const getServerSideProps = async (context) => {
    const { pokemonId } = context.params;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();

    return {
        props: {
            pokemon: data
        }
    }
}

export default function Pokemon({ pokemon }) {
    const { id, name, types, height, weight } = pokemon;

    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{name}</h1>
            <Image
                src={`https://cdn.traction.one/pokedex/pokemon/${id}.png`}
                width='200'
                height='200'
                alt={name}
            />
            <div>
                <h3>Numero:</h3>
                <p>#{id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {types.map((item, index) => (
                        <span key={index}
                            className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{height * 10} cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{weight / 10} kg</p>
                </div>
            </div>
        </div>
    );
}