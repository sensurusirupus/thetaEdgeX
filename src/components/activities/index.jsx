// src/components/Activity.js
import React, { useState, useEffect } from "react";

function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch account activities
    // You will need to implement this part
  }, []);

  return (
    <div>
      <h2>Account Activity</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Activity;
