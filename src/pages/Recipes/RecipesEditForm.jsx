import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipe, updateRecipe } from '../../services/recipes';
import useAlert from '../../hooks/useAlert';
import FormBase from '../../components/FormBase';

function RecipesEditForm() {
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const localStorageKey = `draft_recipe_edit_${id}`;

  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    ingredients: [{ food_name: '', quantity: '' }],
    instructions: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const draft = localStorage.getItem(localStorageKey);
    if (draft) {
      setRecipe(JSON.parse(draft));
      setIsLoading(false);
    } else {
      getRecipe(id)
        .then((data) => {
          if (!data.ingredients || data.ingredients.length === 0) {
            data.ingredients = [{ food_name: '', quantity: '' }];
          }
          setRecipe(data);
          setIsLoading(false);
        })
        .catch(() => {
          showAlert('Receita não encontrada', 'danger');
          setTimeout(() => {
            navigate('/recipes');
          }, 2000);
        });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(localStorageKey, JSON.stringify(recipe));
    }
  }, [recipe, isLoading]);

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const adaptedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.map((ing) => ({
        name: ing.food_name,
        quantity: ing.quantity,
      })),
    };

    try {
      await updateRecipe(id, adaptedRecipe);
      localStorage.removeItem(localStorageKey);
      showAlert('Receita alterada com sucesso', 'success');
      setTimeout(() => {
        navigate('/recipes');
      }, 1500);
    } catch (err) {
      console.error(err);
      showAlert('Erro ao salvar.', 'danger');
    }
  }

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      {alert}
      <FormBase
        title={`Editar receita - ${recipe.name || '...'}`}
        values={recipe}
        setValues={setRecipe}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          localStorage.removeItem(localStorageKey);
          navigate('/recipes');
        }}
        fields={[
          { name: 'name', label: 'Nome', required: true },
          { name: 'category', label: 'Categoria' },
          {
            name: 'ingredients',
            label: 'Ingredientes',
            type: 'dynamic',
            subfields: [
              {
                name: 'food_name',
                placeholder: 'Nome do alimento',
                required: true,
              },
              {
                name: 'quantity',
                placeholder: 'Quantidade',
                required: true,
              },
            ],
          },
          { name: 'instructions', label: 'Instruções', type: 'textarea' },
        ]}
      />
    </>
  );
}

export default RecipesEditForm;
