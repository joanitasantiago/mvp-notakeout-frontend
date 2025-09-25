import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import '../page.css';

function FoodsPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Meus alimentos</h2>
      <Button onClick={() => navigate('/foods/new')}>
        + Cadastrar novo alimento
      </Button>
      <Outlet />
    </div>
  );
}

export default FoodsPage;