import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import TitleManager from './components/titleManager';
import Navbar from './components/Navbar';

//HOMEPAGE
import HomePage from './pages/HomePage';

// FOODS
import FoodsPage from './pages/foods/FoodsPage';
import FoodsList from './pages/foods/FoodsList';
import FoodsForm from './pages/foods/FoodsForm';
import FoodsEditForm from './pages/Foods/FoodsEditForm';

// RECIPES
import RecipesPage from './pages/recipes/RecipesPage';
import RecipesList from './pages/recipes/RecipesList';
import RecipesForm from './pages/recipes/RecipesForm';
import RecipesEditForm from './pages/recipes/RecipesEditForm';

//MENUS
import MenusPage from './pages/menus/MenusPage';
import MenusForm from './pages/menus/MenusForm';
import MenusList from './pages/menus/MenusList';
import MenusEditForm from './pages/menus/MenusEditForm';

//SHOPPING-LIST
import ShoppingListPage from './pages/shoppinglist/ShoppingListPage';

//NOTFOUND
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <TitleManager />
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path="home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="home" />} />

        {/* FOODS */}
        <Route path="/foods" element={<FoodsPage />}>
          <Route index element={<FoodsList />} />
          <Route path="new" element={<FoodsForm />} />
          <Route path=":id/edit" element={<FoodsEditForm />} />
        </Route>

        {/* RECIPES */}
        <Route path="/recipes" element={<RecipesPage />}>
          <Route index element={<RecipesList />} />
          <Route path="new" element={<RecipesForm />} />
          <Route path=":id/edit" element={<RecipesEditForm />} />
        </Route>

        {/* MENUS */}
        <Route path="/menus" element={<MenusPage />}>
          <Route index element={<MenusList />} />
          <Route path="new" element={<MenusForm />} />
          <Route path=":id/edit" element={<MenusEditForm />} />
        </Route>

        {/* SHOPPING-LIST */}
        <Route path="/shopping-list" element={<ShoppingListPage />} />

        {/* NOTFOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
