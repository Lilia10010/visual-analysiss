import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeSwitcher } from ".";

test("renders ThemeSwitcher component", () => {
  render(<ThemeSwitcher />);
  const toggleButton = screen.getByRole("button", { name: "Alterar tema" });
  expect(toggleButton).toBeInTheDocument();

  fireEvent.click(toggleButton);
});
