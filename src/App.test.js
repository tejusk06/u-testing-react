import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {
  render(<App />);
  // expect.assertions(1);
  // Find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({
    backgroundColor: "red",
  });

  //  Click the button
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({
    backgroundColor: "blue",
  });

  // expect the button text to change to "Change to red"
  expect(colorButton.textContent).toBe("Change to red");
});
