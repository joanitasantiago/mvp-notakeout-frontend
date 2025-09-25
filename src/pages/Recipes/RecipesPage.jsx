import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import '../page.css';

function RecipesPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Minhas receitas</h2>
      <Button onClick={() => navigate('/recipes/new')}>
        + Cadastrar nova receita
      </Button>
      <Outlet />
    </div>
  );
}

export default RecipesPage;
