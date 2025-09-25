import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createFood } from '../../services/foods';
import useAlert from '../../hooks/useAlert';
import FormBase from '../../components/FormBase';

function FoodsForm() {
  const navigate = useNavigate();
  const { alert, showAlert } = useAlert();
  const [food, setFood] = useState(() => {
    const saved = localStorage.getItem('draft_food');
    return saved
      ? JSON.parse(saved)
      : { name: '', category: '', in_stock: false, unit: '' };
  });

  useEffect(() => {
    localStorage.setItem('draft_food', JSON.stringify(food));
  }, [food]);

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
      await createFood(food);
      localStorage.removeItem('draft_food');
      showAlert('Alimento criado com sucesso!', 'success');
      setTimeout(() => {
        navigate('/foods');
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
        title="Cadastrar novo alimento"
        values={food}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          localStorage.removeItem('draft_food');
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

export default FoodsForm;
