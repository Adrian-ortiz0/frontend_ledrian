import React from "react";

export const FeedCreate = () => {
  return (
    <div className="feed_create-container">
      <div className="feed_create">
        <img src="/public/profile_icon.png" alt="" width={30} height={30} />
        <textarea type="text" name="" id="" />
      </div>
      <div className="feed_create-media">
        <div>
          <button>
            <img src="/public/image_icon.png" alt="" width={20} height={20} />
          </button>
          <button>
            <img src="/public/emoji_icon.png" alt="" width={20} height={20} />
          </button>
        </div>
        <button id="post_button">
            Post
        </button>
      </div>
    </div>
  );
};
