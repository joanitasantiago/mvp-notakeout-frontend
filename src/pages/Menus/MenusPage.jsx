import { Outlet } from 'react-router-dom';

function MenusPage() {
  return (
    <div className="container">
      <h2>Meus Menus</h2>
      <Outlet />
    </div>
  );
}

export default MenusPage;
