import React from "react"
import { Form } from "react-bootstrap"



export default function RadioGroup({ name, options, selected, onChange }) {
  return (
    <Form className="d-flex gap-4 mb-3">
      {options.map((opt) => (
        <Form.Check
          key={opt.value}
          inline
          type="radio"
          label={opt.label}
          name={name}
          value={opt.value}
          checked={selected === opt.value}
          onChange={(e) => onChange(e.target.value)}
        />
      ))}
    </Form>
  )
}
