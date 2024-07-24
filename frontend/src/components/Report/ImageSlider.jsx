import { useState, useEffect } from "react";

export default function ImageSlider({ report }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!report || !report.photo_urls) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % report.photo_urls.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [report.photo_urls]);

  if (!report || !report.photo_urls) {
    return (
      <div className="report-photo-slider">
        이미지 데이터를 가져오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="report-photo-slider">
      {report.photo_urls.map((url, index) => (
        <img
          key={index}
          src={`backend/${url}`}
          alt={`Slide ${index}`}
          className={`report-photo-slide ${
            index === currentIndex ? "active" : ""
          }`}
        />
      ))}
    </div>
  );
}
