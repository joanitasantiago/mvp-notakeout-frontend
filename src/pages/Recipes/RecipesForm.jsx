import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createRecipe } from '../../services/recipes';
import useAlert from '../../hooks/useAlert';
import FormBase from '../../components/FormBase';

function RecipesForm() {
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();
  const [recipe, setRecipe] = useState(() => {
    const saved = localStorage.getItem('draft_recipe');
    return saved
      ? JSON.parse(saved)
      : {
          name: '',
          category: '',
          ingredients: [{ food_name: '', quantity: '' }],
          instructions: '',
        };
  });

  useEffect(() => {
    localStorage.setItem('draft_recipe', JSON.stringify(recipe));
  }, [recipe]);

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
      await createRecipe(adaptedRecipe);
      localStorage.removeItem('draft_recipe');
      showAlert('Receita criada com sucesso!', 'success');
      setTimeout(() => {
        navigate('/recipes');
      }, 1500);
    } catch (err) {
      console.error(err);
      showAlert('Erro ao cadastrar.', 'danger');
    }
  }

  return (
    <>
      {alert}
      <FormBase
        title="Cadastrar nova receita"
        values={recipe}
        setValues={setRecipe}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          localStorage.removeItem('draft_recipe');
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
              { name: 'quantity', placeholder: 'Quantidade', required: true },
            ],
          },
          { name: 'instructions', label: 'Instruções', type: 'textarea' },
        ]}
      />
    </>
  );
}

export default RecipesForm;
