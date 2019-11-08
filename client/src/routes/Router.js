import React from 'react'
import { history } from "../config/history";
import { Router } from 'react-router-dom'
import { Routes } from "./routes";

const router = (props) => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )
}

export { router as Router}