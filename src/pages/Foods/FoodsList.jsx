import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { getAllFoods, deleteFood } from '../../services/foods';
import useAlert from '../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';

function FoodsList() {
  const [foods, setFoods] = useState([]);
  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    getAllFoods()
      .then((data) => setFoods(data))
      .catch(() => {
        showAlert('Erro ao carregar alimentos', 'danger');
      });
  }, []);

  function handleEdit(id) {
    navigate(`/foods/${id}/edit`);
  }

  function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este alimento?')) {
      deleteFood(id)
        .then(() => {
          showAlert('Alimento excluído com sucesso!', 'success');
          return getAllFoods();
        })
        .then((data) => setFoods(data))
        .catch(() => showAlert('Erro ao excluir alimento.', 'danger'));
    }
  }

  if (foods.length === 0) {
    return <p>Nenhum alimento cadastrado.</p>;
  }

  return (
    <>
      {alert}
      <ul className="foods-list">
        {foods.map((food) => (
          <li key={food.id}>
            <Card
              title={food.name}
              subtitle={food.category}
              onEdit={() => handleEdit(food.id)}
              onDelete={() => handleDelete(food.id)}
            >
              <div className="food-list-item-badges">
                {food.in_stock ? (
                  <>
                    <span className="custom-badge badge-success">
                      ✔ Em estoque
                    </span>
                    <span className="custom-badge badge-secondary">
                      Qtd: {food.unit}
                    </span>
                  </>
                ) : (
                  <span className="custom-badge badge-danger">
                    ❌ Sem estoque
                  </span>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FoodsList;
