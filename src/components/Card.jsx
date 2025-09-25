import React from 'react';
import Button from './Button';
import './Card.css';

function Card({ title, subtitle, children, onEdit, onDelete }) {
  return (
    <div className="custom-card">
      <div className="card-header">
        <strong>{title}</strong>
        {subtitle && <span className="card-subtitle">({subtitle})</span>}
      </div>

      <div className="card-body">
        {children}
      </div>

      <div className="card-footer">
        {onEdit && <Button onClick={onEdit}>Editar</Button>}
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            Excluir
          </Button>
        )}
      </div>
    </div>
  );
}

export default Card;
