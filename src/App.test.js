import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

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

test("initial conditions", () => {
  render(<App />);

  // Check that button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // Check that checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("confirm button disable on checkbox check", () => {
  render(<App />);

  // get button
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(colorButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("confirm if button color changes to grey on disabled", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { label: "Disable button" });

  // change color to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({
    backgroundColor: "gray",
  });

  // enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({
    backgroundColor: "blue",
  });
});

describe("space before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for two inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVoiletRed")).toBe("Medium Voilet Red");
  });
});
