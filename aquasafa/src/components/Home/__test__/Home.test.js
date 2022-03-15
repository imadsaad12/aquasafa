import {
  findByTestId,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import Home from "../Index";

const fillField = (array) => {
  array.map((i, index) => {
    const input = screen.getByTestId(i.id);
    fireEvent.change(input, { target: { value: array[index].value } });
  });
};

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });
  it("Check  input changes and reinitialized (paid)", async () => {
    fillField([
      { id: "f1", value: "imad" },
      { id: "f2", value: 1 },
      { id: "f3", value: 2 },
      { id: "f4", value: 3 },
      { id: "f5", value: 4 },
      { id: "f6", value: 5 },
      { id: "f7", value: 6 },
    ]);
    const button = await screen.findByText("paid order");
    fireEvent.click(button, { name: /paid order/i });
    const F1 = await screen.findByTestId("f1");
    const F2 = await screen.findByTestId("f2");
    expect(F1.value).toEqual("");
    expect(F2.value).toEqual("1");
  });
  it("Check input changes and reinitialized (unpaid)", async () => {
    fillField([
      { id: "f1", value: "imad" },
      { id: "f2", value: 1 },
      { id: "f3", value: 2 },
      { id: "f4", value: 3 },
      { id: "f5", value: 4 },
      { id: "f6", value: 5 },
      { id: "f7", value: 6 },
    ]);
    const button = await screen.findByText(/non-paid order/i);
    fireEvent.click(button);
    const F1 = await screen.findByTestId("f1");
    const F2 = await screen.findByTestId("f2");
    expect(F1.value).toEqual("");
    expect(F2.value).toEqual("1");
  });
  // it("check list render", async () => {
  //   const inpt = screen.getByTestId("f1");
  //   fireEvent.focus(inpt);
  //   fireEvent.change(inpt, { target: { value: "" } });
  //   fireEvent.change(inpt, { target: { value: "A" } });
  //   fireEvent.change(inpt, { target: { value: "l" } });
  //   const item = await screen.findByText("Ali");
  //   expect(item).toBeInTheDocument();
  // });
  it("check amount of total", async () => {
    fillField([
      { id: "f1", value: "imad" },
      { id: "f2", value: 1 },
      { id: "f3", value: 2 },
      { id: "f4", value: 3 },
      { id: "f5", value: 4 },
      { id: "f6", value: 5 },
      { id: "f7", value: 6 },
    ]);
    const total = screen.getByTestId("total");
    expect(total).toBeInTheDocument(720);
  });
});
