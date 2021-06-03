import React from "react";

type Currency = number | string;

interface Props {
  setTotalTip: (value: Currency | ((prev: Currency) => Currency)) => void;
  setTipPerPerson: (value: Currency | ((prev: Currency) => Currency)) => void;
  setTotalBillAmount: (
    value: Currency | ((prev: Currency) => Currency)
  ) => void;
  setTotalPerPerson: (value: Currency | ((prev: Currency) => Currency)) => void;
}

const Inputs = ({
  setTotalTip,
  setTipPerPerson,
  setTotalBillAmount,
  setTotalPerPerson
}: Props): JSX.Element => {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    const billAmount: number = Number(
      (document.getElementById("billamount") as HTMLInputElement).value
    );
    const tipPercent: number = Number(
      (document.getElementById("tippercent") as HTMLInputElement).value
    );
    const people: number = Number(
      (document.getElementById("people") as HTMLInputElement).value
    );

    const isFloat = (num: number): Currency => {
      if (num % 1 === 0) {
        return num;
      } else {
        // toFixed() converts from num to str
        // Number() removes trailing zeroes
        return num.toFixed(2);
      }
    };

    setTotalTip(isFloat(billAmount * (tipPercent / 100)));
    setTipPerPerson(isFloat((billAmount * (tipPercent / 100)) / people));
    setTotalPerPerson(
      isFloat((billAmount + billAmount * (tipPercent / 100)) / people)
    );
    setTotalBillAmount(isFloat(billAmount + billAmount * (tipPercent / 100)));
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <input
        type="number"
        min="0"
        step=".01"
        id="billamount"
        placeholder="Bill amount..."
        required
      />
      <input
        type="number"
        min="0"
        max="100"
        step=".01"
        id="tippercent"
        placeholder="Tip %"
        required
      />
      <input
        type="number"
        min="1"
        step="1"
        id="people"
        placeholder="Number of people"
        required
      />
      <button className="submit-btn" type="submit">
        Calculate Tip
      </button>
    </form>
  );
};

export default Inputs;
