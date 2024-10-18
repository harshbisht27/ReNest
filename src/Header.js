import React from 'react';
import './App.css';
import { IoMdClose } from "react-icons/io";

const SignUpDialog = ({ onClose, onRegisterAsCustomer, onRegisterAsSeller }) => {
  return (
    <div className="dialog-wrapper">
      <div className="dialog">
        <div className="dialog-header">
          <h2>Register</h2>
          <button className="close-button" onClick={onClose}>
            <h3 className='icon'><IoMdClose /></h3>
          </button>
        </div>
        <div className="dialog-body">
          <button onClick={onRegisterAsCustomer}>Register as Customer</button>
          <button onClick={onRegisterAsSeller}>Register as Seller</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpDialog;
