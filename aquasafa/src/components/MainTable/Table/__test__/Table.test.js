import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MTable from "../Index";

const customers = [
  {
    fullname: "imad",
    phone: parseInt("0303", 8),
    turn: parseInt("1", 8),
    tag: "Location-x",
    address: "address-x",
    _id: "xxx",
  },
];
const MockTable = () => {
  return (
    <BrowserRouter>
      <MTable customers={customers} />
    </BrowserRouter>
  );
};
describe("Table", () => {
  it("check rendring all the customers", async () => {
    render(<MockTable />);
    const nameElement = await screen.findByText("imad");
    const turnElement = await screen.findByText("1");
    const tagElement = await screen.findByText("Location-x");
    expect(nameElement).toBeInTheDocument();
    expect(turnElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
  });
});
