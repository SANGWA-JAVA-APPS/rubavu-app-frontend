import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import StockCommons from "../../services/StockServices/StockCommons";
import StockRepository from "../../services/StockServices/StockRepository";
import { useAuthHeader } from "react-auth-kit";
const AccountCategoryForm = ({ onCreated }) => {
    const [accountCategories, setAccountCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const authHeader = useAuthHeader()();

    useEffect(() => {
        StockRepository.findAccount_category(authHeader).then((res) => {
            setAccountCategories(res.data);
        });
        StockRepository.finduserRoles(authHeader).then((res) => {
            setRoles(res.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cat = accountCategories.find(c => c.id === parseInt(selectedCategoryId));
        const role = roles.find(r => r.id === parseInt(selectedRoleId));

        const payload = {
            id: cat.id,
            name: cat.name,
            roleIds: [role.id]
        };
        await StockCommons.saveAccountCategory(payload, authHeader);
        alert("Assigned " + role.name + " to " + cat.name);
    };

    return (
        <Card className="bg-light">
            <Card.Body>
                <Card.Title>Assign Role to Account Category</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Account Category</Form.Label>
                        <Form.Select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {accountCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={selectedRoleId}
                            onChange={(e) => setSelectedRoleId(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Assign</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AccountCategoryForm;