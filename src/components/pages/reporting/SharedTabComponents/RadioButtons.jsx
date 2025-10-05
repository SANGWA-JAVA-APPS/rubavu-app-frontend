import { Form } from "react-bootstrap"
import PropTypes from 'prop-types'



export default function RadioGroup({ name, options, selected, onChange }) {
  return (
    <Form className="d-flex gap-4 mb-3">
      {options.map((opt) => {
        const uniqueId = `${name}-${opt.value}`;
        return (
          <Form.Check
            key={opt.value}
            inline
            type="radio"
            id={uniqueId}
            label={opt.label}
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      })}
    </Form>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
