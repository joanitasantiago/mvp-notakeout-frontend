import { useNavigate } from 'react-router-dom';

function MenusForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/menus');
  }

  return (
    <div>
      <h3>Cadastrar novo Menu</h3>
      <form onSubmit={handleSubmit}>
        <button type="submit"> Salvar </button>
        <button type="button" onClick={() => navigate('/menus')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default MenusForm;
