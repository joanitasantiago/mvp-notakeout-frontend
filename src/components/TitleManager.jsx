import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/foods') {
      document.title = 'Meus Alimentos - NoTakeout';
    } else if (pathname === '/foods/new') {
      document.title = 'Cadastrar Alimento - NoTakeout';
    } else if (pathname.includes('/foods/') && pathname.includes('/edit')) {
      document.title = 'Editar Alimento - NoTakeout';
    } else if (pathname === '/recipes') {
      document.title = 'Minhas Receitas - NoTakeout';
    } else if (pathname === '/recipes/new') {
      document.title = 'Cadastrar Receita - NoTakeout';
    } else if (pathname.includes('/recipes/') && pathname.includes('/edit')) {
      document.title = 'Editar Receita - NoTakeout';
    } else if (pathname === '/menus') {
      document.title = 'Meus Menus - NoTakeout';
    } else if (pathname === '/shopping-list') {
      document.title = 'Lista de Compras - NoTakeout';
    } else {
      document.title = 'NoTakeout';
    }
  }, [pathname]);

  return null;
}

export default TitleManager;
