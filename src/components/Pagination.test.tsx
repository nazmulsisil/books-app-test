import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

test("calls onPageChange with correct page numbers when Previous and Next buttons are clicked", () => {
  const onPageChange = jest.fn();
  render(
    <Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />
  );

  fireEvent.click(screen.getByText("Previous"));
  expect(onPageChange).toHaveBeenCalledWith(2);

  fireEvent.click(screen.getByText("Next"));
  expect(onPageChange).toHaveBeenCalledWith(4);
});
