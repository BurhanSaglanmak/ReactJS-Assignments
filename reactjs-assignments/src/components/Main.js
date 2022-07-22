import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonalMap from "./PersonalMap";
import "./loading.css";

const baseUrl = "https://jsonplaceholder.typicode.com/users";

function Main() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        const { data } = response;
        if (!!data.length) {
          setPosts(response.data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!posts?.length) {
    return <div>veri bulunamadı</div>;
  }

  return (
    <div>
      {posts?.map((post, index) => (
        <PersonalMap
          key={index}
          index={index}
          post={post}
          posts={posts}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
}

export default Main;
