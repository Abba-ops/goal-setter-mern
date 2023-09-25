import { useCreateGoalMutation } from "../features/goals/goalsApiSlice";
import { addGoal } from "../features/goals/goalsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function GoalForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const [createGoal] = useCreateGoalMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const goal = await createGoal({ text }).unwrap();
      dispatch(addGoal(goal));
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Enter a new goal:</label>
          <input
            id="text"
            type="text"
            name="text"
            value={text}
            placeholder="E.g., Learn a new skill..."
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
