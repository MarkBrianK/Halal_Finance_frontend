import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "../utilis/axiosConfig";

const Wallet = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [limit, setLimit] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get(`/wallets/${userId}`);
        setBalance(parseFloat(response.data.balance) || 0);
        setLimit(parseFloat(response.data.limit) || 0);
        setExpenditure(parseFloat(response.data.expenditure) || 0);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };
    fetchWalletData();
  }, [userId]);

  const handleLimitChange = async (newLimit) => {
    setLimit(newLimit);
    try {
      await axios.put(`/wallets/${userId}`, { limit: newLimit });
    } catch (error) {
      console.error("Error updating limit:", error);
    }
  };

  const handleAddFunds = async () => {
    try {
      await axios.post(`/wallet/add-funds`, { userId, amount });
      setBalance((prev) => prev + parseFloat(amount));
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const handleWithdrawFunds = async () => {
    if (expenditure + amount > limit) {
      alert("Withdrawal denied: Exceeds expenditure limit.");
      return;
    }
    try {
      await axios.post(`/wallet/withdraw`, { userId, amount });
      setBalance((prev) => prev - parseFloat(amount));
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Wallet Balance</Card.Title>
        <Card.Text>Ksh {balance.toFixed(2)}</Card.Text>

        <Form.Label>Set Expenditure Limit</Form.Label>
        <Form.Range
          value={limit}
          onChange={(e) => handleLimitChange(parseFloat(e.target.value))}
          max={balance}
          min={0}
          step={0.01}
          style={{ width: "100%", marginBottom: "15px" }}
        />
        <div>Limit: Ksh {limit.toFixed(2)}</div>
        <div>Current Expenditure: Ksh {expenditure.toFixed(2)}</div>

        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          min="0"
          className="mb-2"
        />

        <Button variant="primary" onClick={() => handleLimitChange(limit)} className="my-2">
          Update Limit
        </Button>
        <Button variant="success" onClick={handleAddFunds} className="me-2">
          Add Funds
        </Button>
        <Button
          variant="danger"
          onClick={handleWithdrawFunds}
          disabled={expenditure >= limit}
        >
          Withdraw
        </Button>
        {expenditure >= limit && <p>Limit reached</p>}
      </Card.Body>
    </Card>
  );
};

export default Wallet;
