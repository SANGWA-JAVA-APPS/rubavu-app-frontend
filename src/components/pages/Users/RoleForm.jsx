
import React, { useState } from "react";

import { Form, Button, Card } from "react-bootstrap";
import StockCommons from "../../services/StockServices/StockCommons";


const RoleForm = ({ onCreated }) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        if (!name.trim()) return;
        try {
            await StockCommons.saveRole({ name }, authHeader);
            setName("");
            onCreated(); // reload list
        } catch (err) {
            alert("Failed to create role.");
        }
    };

    return (
        <Card className="bg-light">
            <Card.Body>
                <Card.Title>Add Role</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Enter role name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="mt-2" type="submit" variant="primary">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RoleForm;