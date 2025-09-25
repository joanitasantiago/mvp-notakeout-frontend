import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { getAllRecipes, deleteRecipe } from '../../services/recipes';
import useAlert from '../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';
import './recipes.css';

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes()
      .then((data) => setRecipes(data))
      .catch(() => {
        showAlert('Erro ao carregar receitas', 'danger');
      });
  }, []);

  function handleEdit(id) {
    navigate(`/recipes/${id}/edit`);
  }

  function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      deleteRecipe(id)
        .then(() => {
          showAlert('Receita excluída com sucesso!', 'success');
          return getAllRecipes();
        })
        .then((data) => setRecipes(data))
        .catch(() => showAlert('Erro ao excluir receita.', 'danger'));
    }
  }

  if (recipes.length === 0) {
    return <p>Nenhuma receita cadastrada.</p>;
  }

  return (
    <>
      {alert}
      <ul className="recipes-list">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Card
              title={recipe.name}
              subtitle={recipe.category}
              onEdit={() => handleEdit(recipe.id)}
              onDelete={() => handleDelete(recipe.id)}
            >
              <p>
                <strong>Instruções:</strong> {recipe.instructions}
              </p>

              {recipe.ingredients?.length > 0 && (
                <div className="recipe-list-item-badges">
                  {recipe.ingredients.map((ing, i) => (
                    <span key={i} className="custom-badge">
                      {ing.food_name} ({ing.quantity})
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipesList;
