const BASE_URL = 'http://127.0.0.1:5000';

export async function createFood(newFoodData) {
  const res = await fetch(`${BASE_URL}/foods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFoodData),
  });

  if (!res.ok) throw new Error('Erro ao criar alimento');
  return res.json();
}

export async function getAllFoods() {
  const res = await fetch(`${BASE_URL}/foods`);
  if (!res.ok) throw new Error('Erro ao carregar alimentos');
  return res.json();
}

export async function getFood(id) {
  const res = await fetch(`${BASE_URL}/foods/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar alimento');
  return res.json();
}

export async function updateFood(id, updatedData) {
  const res = await fetch(`${BASE_URL}/foods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Erro ao atualizar alimento');
  return res.json();
}

export async function deleteFood(id) {
  const res = await fetch(`${BASE_URL}/foods/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao excluir alimento');
  return true;
}
