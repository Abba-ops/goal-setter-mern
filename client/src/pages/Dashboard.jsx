import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { useLazyGetGoalsQuery } from "../features/goals/goalsApiSlice";
import { setGoals } from "../features/goals/goalsSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { goals } = useSelector((state) => state.goals);
  const [getGoals, { isLoading }] = useLazyGetGoalsQuery();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await getGoals().unwrap();
        dispatch(setGoals(res));
      } catch (err) {
        toast.error(err?.data?.error?.message);
      }
    };
    fetchGoals();
  }, [dispatch, getGoals]);

  return (
    <>
      <section className="heading">
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {isLoading ? (
          <Spinner />
        ) : goals && goals.length ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}
