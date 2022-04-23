export const getStaticPaths = async () => {
    const maxPokemons = 100;
    const api = 'https://pokeapi.co/api/v2/pokemon/';

    const response = await fetch(`${api}/?limit=${maxPokemons}`);
    const data = await response.json();

    // params
    const paths = data.results.map((pokemon, index) => {
        return {
            params: {
                pokemonId: (index + 1).toString()
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
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
    const { name } = pokemon;

    return (
        <h1>{name}</h1>
    );
}