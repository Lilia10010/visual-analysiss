import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Headerbar } from ".";

describe("Headerbar", async () => {
  it("should render the headerbar", () => {
    render(<Headerbar />);
    const logoImage = screen.getByRole("img", { name: "Logo" });
    expect(logoImage).toBeInTheDocument();
  });
});
