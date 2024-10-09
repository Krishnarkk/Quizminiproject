import React from "react";
const UpdateAnswerComponent = React.memo(({ updatedAnswer, setUpdatedAnswer }) => {
  return (
    <div>
      <form className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your answer"
          value={updatedAnswer}
          onChange={(e) => setUpdatedAnswer(e.target.value)}
          required
        />
      </form>
    </div>
  );
});

export default UpdateAnswerComponent;
