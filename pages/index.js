import { Fragment } from 'react';
import Card from '../components/Card';
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';

export async function getStaticProps() {
  //const maxPokemons = 100;
  const api = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  //const api = 'https://pokeapi.co/api/v2/pokemon/';

  //const response = await fetch(`${api}/?limit=${maxPokemons}`);
  const response = await fetch(api);
  const data = await response.json();

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results
    }
  }
}

export default function Home({ pokemons }) {
  const [paginate, setPaginate] = useState(0);
  const [removeButton, setRemoveButton] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPokemons = async (offset) => {
    setLoading(true);

    const api = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    const response = await fetch(api);
    const data = await response.json();

    if (offset > data.count) {
      setRemoveButton(true);
      return;
    }

    // add pokemon index
    let value = offset;

    data.results.forEach((item, index) => {
      item.id = value + 1;
      value = item.id;
    });

    setPaginate(data.results);
    setLoading(false);
  }

  useEffect(() => {
    if (offset !== 0) {
      getPokemons(offset);
    }
  }, [offset]);

  return (
    <Fragment>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>
        <Image
          src='/images/pokeball.png'
          width='50'
          height='50'
          alt='PokeNext'
        />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}

        {
          paginate.length > 0 && paginate.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))
        }

        {!removeButton && 
          <div className={styles.load_more}>
            <button disabled={loading} onClick={() => setOffset(offset + 20)}>
              { !loading ? 'Carregar mais' : 'Aguarde, carregando...'}
            </button>
          </div>
        }
      </div>
    </Fragment>
  )
}
