import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  setName,
  setEmail
} from "../../features/user/userSlice";
import "./form.css";

const UserForm = () => {
  const dispatch = useDispatch();
  const { name, email, status } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    dispatch(addUser({ name, email }));
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-title">{status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && <p>User added successfully!</p>}
            {status === 'failed' && <p>Error occurred while adding user.</p>}</h1>

        <form className="user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />

          <input
            type="text"
            placeholder="Your email address"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />

          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
