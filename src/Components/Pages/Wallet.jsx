import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "../utilis/axiosConfig";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [limit, setLimit] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get(`/wallets`);
        setBalance(response.data.balance);
        setLimit(response.data.limit || 0);
        setExpenditure(response.data.expenditure || 0);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };
    fetchWalletData();
  }, []);

  const handleLimitChange = (event) => {
    const newLimit = parseFloat(event.target.value);
    if (newLimit >= expenditure) setLimit(newLimit);
  };

  const handleLimitUpdate = async () => {
    try {
      await axios.put(`/wallets`, { limit });
    } catch (error) {
      console.error("Error updating limit:", error);
    }
  };

  const handleAddFunds = () => {

  };

  const handleWithdrawFunds = () => {
    if (expenditure + 100 <= limit) {
      setExpenditure(expenditure + 100);
      setBalance(balance - 100);
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
          onChange={handleLimitChange}
          max={balance}
          min={0}
          step={0.01}
          style={{ width: "100%", marginBottom: "15px" }}
        />
        <div>Limit: Ksh {limit.toFixed(2)}</div>
        <div>Current Expenditure: Ksh {expenditure.toFixed(2)}</div>

        <Button variant="primary" onClick={handleLimitUpdate} className="my-2">
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
