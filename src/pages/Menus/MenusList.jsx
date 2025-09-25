import { useNavigate } from 'react-router-dom';

function MenusList() {
  const navigate = useNavigate();

  return (
    <div>
      <h3> Lista de Menus </h3>
      <button type="button" onClick={() => navigate('/menus/new')}>
        + Adicionar Menu
      </button>
    </div>
  );
}

export default MenusList;
