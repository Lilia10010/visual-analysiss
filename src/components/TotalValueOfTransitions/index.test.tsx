import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { TotalValueOfTransitions } from ".";

describe("CardStatus", async () => {
  it("should render the card status", () => {
    render(<TotalValueOfTransitions amount="R$ 100,00" label="Entradas" />);
    const cardStatus = screen.getByText("Entradas");
    expect(cardStatus).toBeInTheDocument();
  });
});
