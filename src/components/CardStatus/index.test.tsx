import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CardStatus } from ".";

describe("CardStatus", async () => {
  it("should render the card status", () => {
    render(<CardStatus percentage="50%" status="approved" />);
    const cardStatus = screen.getByText("Aprovada");
    expect(cardStatus).toBeInTheDocument();
  });
});
