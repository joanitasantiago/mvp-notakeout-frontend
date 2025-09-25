import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/foods">Meus Alimentos</Link>
      <Link to="/recipes">Minhas Receitas</Link>
      <Link to="/menus">Meus Menus</Link>
      <Link to="/shopping-list">Lista de Compras</Link>
    </nav>
  );
}

export default Navbar;
