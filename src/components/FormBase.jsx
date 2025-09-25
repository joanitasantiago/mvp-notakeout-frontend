import Button from './Button';
import './FormBase.css';

function FormBase({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  setValues, // necessário para manipular campos dinâmicos
}) {
  function handleDynamicChange(fieldName, index, subName, subValue) {
    const updated = [...values[fieldName]];
    updated[index][subName] = subValue;
    setValues((prev) => ({ ...prev, [fieldName]: updated }));
  }

  function addItem(fieldName, template) {
    const updated = [...values[fieldName], { ...template }];
    setValues((prev) => ({ ...prev, [fieldName]: updated }));
  }

  function removeItem(fieldName, index) {
    const updated = values[fieldName].filter((_, i) => i !== index);
    setValues((prev) => ({ ...prev, [fieldName]: updated }));
  }

  return (
    <form onSubmit={onSubmit} className="form-box">
      <h3>{title}</h3>

      {fields.map((field) => (
        <div className="form-input-group" key={field.name}>
          {field.type === 'checkbox' ? (
            <label>
              <input
                type="checkbox"
                name={field.name}
                checked={values[field.name] || false}
                onChange={onChange}
              />
              {field.label}
            </label>
          ) : field.type === 'textarea' ? (
            <>
              <label htmlFor={field.name}>{field.label}</label>
              <textarea
                id={field.name}
                name={field.name}
                value={values[field.name] || ''}
                onChange={onChange}
                className="form-textarea"
                rows={4}
              />
            </>
          ) : field.type === 'dynamic' ? (
            <>
              <label>{field.label}</label>
              {values[field.name]?.map((item, index) => (
                <div key={index} className="dynamic-input-row">
                  {field.subfields.map((sub) => (
                    <input
                      key={sub.name}
                      type="text"
                      placeholder={sub.placeholder}
                      required={sub.required}
                      value={item[sub.name]}
                      onChange={(e) =>
                        handleDynamicChange(
                          field.name,
                          index,
                          sub.name,
                          e.target.value
                        )
                      }
                    />
                  ))}
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => removeItem(field.name, index)}
                  >
                    –
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  addItem(
                    field.name,
                    field.subfields.reduce((acc, sf) => {
                      acc[sf.name] = '';
                      return acc;
                    }, {})
                  )
                }
              >
                + Adicionar Ingrediente
              </Button>
            </>
          ) : (
            <>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                value={values[field.name] || ''}
                onChange={onChange}
                required={field.required}
                placeholder={field.placeholder}
              />
            </>
          )}
        </div>
      ))}

      <Button type="submit">{submitLabel}</Button>
      <Button type="button" variant="danger" onClick={onCancel}>
        {cancelLabel}
      </Button>
    </form>
  );
}

export default FormBase;
