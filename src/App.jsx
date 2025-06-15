import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import PlanDate from './components/PlanDate/PlanDate'
import Confirmation from './components/Confirmation/Confirmation'
import MyDates from './components/MyDates/MyDates'
import Invite from './components/Invite/Invite'
import Reminders from './components/Reminders/Reminders'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanDate />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/my-dates" element={<MyDates />} />
          <Route path="/invite/:id" element={<Invite />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App