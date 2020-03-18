import React, { useState, useEffect } from "react";

const PostText = () => {
  const [hasError, setErrors] = useState(false);
  const [blogText, setTexts] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/get/")
      res
        .json()
        .then(res => setTexts(res))
        .catch(err => setErrors(err));

    }

    fetchData();
  });

  return (
    <div>
      <span>{JSON.stringify(blogText)}</span>
    </div>
  );
};
export default PostText;
