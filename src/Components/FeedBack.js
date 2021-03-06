import React, { useEffect, useState } from "react";

import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";

const FeedBack = () => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/Feedback")
      .then((response) => response.json())
      .then((json) => setstate(json))
      .catch((err) => alert("Something is error" + err));
  }, [state]);

  return (
    <React.Fragment>
      <Navbar>
        <h2>FEEDBACK</h2>
        <Link to="/">Back</Link>
      </Navbar>
      <div className="StartPointOfFeed">
        {state.map((Feed) => (
          <div className="divposts ">
            <h3>
              {" "}
              <span>email:-</span> <br /> {Feed.userID}
            </h3>
            <h3>
              {" "}
              <span>FeedBack:-</span> <br /> {Feed.FeedBack}
            </h3>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default FeedBack;
