import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./VideoFeed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots, faBagShopping, faTimes } from "@fortawesome/free-solid-svg-icons";

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [openCommentIdx, setOpenCommentIdx] = useState(null);
  const feedRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fallbackVideos = [
    {
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: "Monsoon Streetwear Look | #rainyday #streetstyle",
      username: "@styleguru",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      _id: "demo1"
    },
    {
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      caption: "90s Retro Denim | #throwback #denimlove",
      username: "@retroqueen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      _id: "demo2"
    },
    {
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      caption: "Minimalist Festive | #minimal #festivefit",
      username: "@minimalelegance",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      _id: "demo3"
    },
    {
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      caption: "Boho Vibes | #boho #summerlook",
      username: "@bohochic",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      _id: "demo4"
    }
  ];

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/video-feed");
      const vids = res.data.reverse();
      setVideos(vids.length > 0 ? vids : fallbackVideos);
    } catch (err) {
      setVideos(fallbackVideos);
    }
  };

  // Scroll handler for vertical snap
  const handleScroll = () => {
    if (!feedRef.current) return;
    const children = Array.from(feedRef.current.children);
    const scrollTop = feedRef.current.scrollTop;
    let closestIdx = 0;
    let minDist = Infinity;
    children.forEach((child, idx) => {
      const dist = Math.abs(child.offsetTop - scrollTop);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    setCurrent(closestIdx);
  };

  // Autoplay/pause logic
  useEffect(() => {
    if (!feedRef.current) return;
    const videosEl = feedRef.current.querySelectorAll("video");
    videosEl.forEach((v, idx) => {
      if (idx === current) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [current, videos]);

  const mockComments = [
    { user: "@fashionista", text: "Love this look! 🔥" },
    { user: "@trendhunter", text: "Where's the jacket from?" },
    { user: "@minimalelegance", text: "So aesthetic!" },
  ];

  const handleCommentClick = (idx) => {
    setOpenCommentIdx(idx);
  };

  const handleCloseComments = () => {
    setOpenCommentIdx(null);
  };

  return (
    <div className="reels-feed" ref={feedRef} onScroll={handleScroll}>
      {videos.length === 0 ? (
        <div style={{color: '#fff', textAlign: 'center', marginTop: '3rem'}}>No videos yet.</div>
      ) : (
        videos.map((v, idx) => (
          <React.Fragment key={v._id || idx}>
            <div
              className="reels-post"
              tabIndex={0}
            >
              <video
                src={v.videoUrl}
                className="video-player"
                loop
                playsInline
                controls={false}
                muted
                autoPlay={idx === current}
              />
              <div className="reels-gradient"></div>
              <div className="reels-userbar">
                <img src={v.avatar || fallbackVideos[0].avatar} alt="avatar" className="reels-avatar" />
                <span className="reels-username">{v.username || "@myntrauser"}</span>
              </div>
              <div className="video-caption reels-caption">
                {v.caption}
              </div>
              <div className="reels-overlay">
                <button className="reels-btn like">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="reels-btn comment" onClick={() => handleCommentClick(idx)}>
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
                <button className="reels-btn shop">
                  <FontAwesomeIcon icon={faBagShopping} />
                </button>
              </div>
            </div>
            {openCommentIdx === idx && (
              <div className="reels-comments-side">
                <div className="reels-comments-header">
                  <span>Comments</span>
                  <button className="reels-comments-close" onClick={handleCloseComments}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                {mockComments.map((c, i) => (
                  <div key={i}><span className="reels-comment-user">{c.user}</span>{c.text}</div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default VideoFeed;
