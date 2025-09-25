import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFood, updateFood } from '../../services/foods';
import useAlert from '../../hooks/useAlert';
import FormBase from '../../components/FormBase';

function FoodsEditForm() {
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const localStorageKey = `draft_food_edit_${id}`;
  const navigate = useNavigate();
  const [food, setFood] = useState({
    name: '',
    category: '',
    in_stock: false,
    unit: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const draft = localStorage.getItem(localStorageKey);
    if (draft) {
      setFood(JSON.parse(draft));
      setIsLoading(false);
    } else {
      getFood(id)
        .then((data) => {
          setFood(data);
          setIsLoading(false);
        })
        .catch(() => {
          showAlert('Alimento não encontrado', 'danger');
          setTimeout(() => {
            navigate('/foods');
          }, 2000);
        });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(localStorageKey, JSON.stringify(food));
    }
  }, [food, isLoading]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFood((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateFood(id, food);
      localStorage.removeItem(localStorageKey);
      showAlert('Alimento alterado com sucesso', 'success');
      setTimeout(() => {
        navigate('/foods');
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
        title={`Editar alimento - ${food.name || '...'}`}
        values={food}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          localStorage.removeItem(localStorageKey);
          navigate('/foods');
        }}
        fields={[
          { name: 'name', label: 'Nome', required: true },
          { name: 'category', label: 'Categoria' },
          { name: 'in_stock', label: 'Em estoque?', type: 'checkbox' },
          { name: 'unit', label: 'Unidade', placeholder: 'ex: kg, unidade' },
        ]}
      />
    </>
  );
}

export default FoodsEditForm;
