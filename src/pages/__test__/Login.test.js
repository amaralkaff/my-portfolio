import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Login from "../Login";

// Extend Jest with the axe matcher
expect.extend(toHaveNoViolations);

test("Login page should have no accessibility violations", async () => {
  const { container } = render(<Login />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
