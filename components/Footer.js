import styles from '../styles/Footer.module.css';

export default function Footer() {
	const getCurrentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<p>
				<span>PokeNext</span> &copy; {getCurrentYear}  | Desenvolvido por Lucas de Almeida Monteiro (:
			</p>
		</footer>
	);
}