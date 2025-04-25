import { render, screen } from "@testing-library/react";
import UseEffectExample from "./UseEffectExample";

describe("UseEffectExample Component", () => {
  test("renders 'Loading...' when loading is true", () => {
    render(<StatusMessage loading={true} error={false} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders 'Something went wrong...' when error is true", () => {
    render(<UseEffectExample loading={false} error={true} />);
    expect(screen.getByText("Something went wrong...")).toBeInTheDocument();
  });

  test("renders nothing when both loading and error are false", () => {
    render(<UseEffectExample loading={false} error={false} />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Something went wrong...")).not.toBeInTheDocument();
  });

  test("renders 'Loading...' even if error is true when loading is also true", () => {
    render(<UseEffectExample loading={true} error={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong...")).not.toBeInTheDocument();
  });
});
