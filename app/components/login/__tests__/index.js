import renderer from "react-test-renderer";
import Login from "../";

test("login component rendered correctly ", () => {
  it("login component", () => {
    renderer.create(<Login />);
  });
});
