import { useNavigate } from 'react-router-dom';

function MenusEditForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/menus');
  }

  return (
    <div>
      <h3>Editar Menu x</h3>
      <form onSubmit={handleSubmit}>
        <button type="submit"> Salvar alterações </button>
        <button type="button" onClick={() => navigate('/menus')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default MenusEditForm;
