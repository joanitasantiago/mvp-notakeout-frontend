const BASE_URL = 'http://127.0.0.1:5000';

export async function createRecipe(newRecipeData) {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipeData),
  });

  if (!res.ok) throw new Error('Erro ao criar receita');
  return res.json();
}

export async function getAllRecipes() {
  const res = await fetch(`${BASE_URL}/recipes`);
  if (!res.ok) throw new Error('Erro ao carregar receitas');
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar receita');
  return res.json();
}

export async function updateRecipe(id, updatedData) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Erro ao atualizar receita');
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao excluir receita');
  return true;
}
