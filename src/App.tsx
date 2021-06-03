import React, { useState } from "react";
import "./style.css";
// Components
import Results from "./components/Results";
import Inputs from "./components/Inputs";

type Currency = number | string

const App = () => {
  const [totalTip, setTotalTip] = useState<Currency>(0);
  const [tipPerPerson, setTipPerPerson] = useState<Currency>(0);
  const [totalBillAmount, setTotalBillAmount] = useState<Currency>(0);
  const [totalPerPerson, setTotalPerPerson] = useState<Currency>(0);

  return (
    <div className="App">
      <p className="title">Tip Calculator</p>
      <Results
        totalTip={totalTip}
        tipPerPerson={tipPerPerson}
        totalBillAmount={totalBillAmount}
        totalPerPerson={totalPerPerson}
      />
      <Inputs
        setTotalTip={setTotalTip}
        setTipPerPerson={setTipPerPerson}
        setTotalBillAmount={setTotalBillAmount}
        setTotalPerPerson={setTotalPerPerson}
      />
    </div>
  );
};

export default App;
