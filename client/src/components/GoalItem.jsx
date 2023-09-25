import { useDispatch } from "react-redux";
import { useDeleteGoalMutation } from "../features/goals/goalsApiSlice";
import { removeGoal } from "../features/goals/goalsSlice";
import Spinner from "../components/Spinner";

export default function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [deleteGoal, { isLoading }] = useDeleteGoalMutation();

  const onClick = async () => {
    try {
      dispatch(removeGoal({ id: goal._id }));
      await deleteGoal(goal._id);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button className="close" disabled={isLoading} onClick={onClick}>
        {isLoading ? <Spinner /> : "X"}
      </button>
    </div>
  );
}
