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
  const [dataPokemons, setDataPokemons] = useState(pokemons || []);
  const [pokemonsList, setPokemonsList] = useState(pokemons || []);
  const [search, setSearch] = useState('');

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

    const paginateData = Array.isArray(paginate) ? paginate.concat(data.results) : data.results;

    setPaginate(paginateData);
    setLoading(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;

    setSearch(value.toLocaleLowerCase());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search === '') {
      setRemoveButton(true);
      setDataPokemons([]);
      setPaginate([]);
      return;
    }

    setLoading(true);

    const api = `https://pokeapi.co/api/v2/pokemon?limit=1126`;
    const response = await fetch(api);
    const data = await response.json();

    // add pokemon index
    data.results.forEach((item, index) => {
      item.id = index + 1;
    });

    const dataSearch = data.results.filter(
      ({ name }) => name.includes(search),
    );

    setRemoveButton(true);
    setDataPokemons(dataSearch);
    setPaginate([]);
    setLoading(false);
  }

  const handleBack = () => {
    setSearch('');
    setRemoveButton(false);
    setDataPokemons(pokemonsList);
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_control}>
            <input
              type='text'
              name='search'
              placeholder='Pesquise pelo pokémon desejado...'
              onChange={handleChange}
              value={search || ''}
            />

            <button type='submit'>Pesquisar</button>
          </div>
        </form>

        <div className={styles.not_data}>
          {loading && (
            <Image
              src='/images/loading.svg'
              width='50'
              height='50'
              alt='Loading'
            />
          )}
        </div>

        {
          dataPokemons.length > 0 ? (
            dataPokemons.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <div className={styles.not_data}>
              <p>Nenhum registro foi encontrado, tente novamente.</p>
              <br />
              <button onClick={handleBack}>Voltar</button>
            </div>
          )
        }

        {
          paginate.length > 0 && paginate.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))
        }

        {!removeButton &&
          <div className={styles.load_more}>
            <button disabled={loading} onClick={() => setOffset(offset + 20)}>
              {!loading ? 'Carregar mais' : 'Aguarde, carregando...'}
            </button>
          </div>
        }
      </div>
    </Fragment >
  )
}
