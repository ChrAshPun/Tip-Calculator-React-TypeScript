import React from "react";

type Currency = number | string;

interface Props {
  totalTip: Currency;
  tipPerPerson: Currency;
  totalBillAmount: Currency;
  totalPerPerson: Currency;
}

const Results = ({
  totalTip,
  tipPerPerson,
  totalBillAmount,
  totalPerPerson
}: Props): JSX.Element => {
  return (
    <div className="results-outer">
      <div className="results-inner">
        <div className="results-flex">
          <p>Total tip:</p>
          <p>{"$" + totalTip}</p>
        </div>
        <div className="results-flex">
          <p>Tip per person:</p>
          <p>{"$" + tipPerPerson}</p>
        </div>
        <div className="results-flex">
          <p>Total per person:</p>
          <p>{"$" + totalPerPerson}</p>
        </div>
        <div className="results-flex">
          <p>Total bill amount:</p>
          <p>{"$" + totalBillAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
