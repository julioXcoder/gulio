"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Nike React",
      subtitle: "Rewriting sport's playbook for billions of athletes",
    },
    {
      url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "CoolApps",
      subtitle: "From mobile apps to gaming consoles",
    },
    {
      url: "https://images.unsplash.com/photo-1629666451094-8908989cae90?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Grumpy",
      subtitle: "Bringing Art to everything",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div
      style={{ padding: "2.5rem", display: "flex", justifyContent: "center" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          overflow: "hidden",
          borderRadius: "1rem",
          background: "#e0e0e0",
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.7s",
            transform: `translateX(-${currentIndex * 100}%)`,
            height: "30rem",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                minWidth: "100%",
                backgroundImage: `url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2rem",
                color: "white",
              }}
            >
              <span>{slide.title}</span>
              <span style={{ fontSize: "1.5rem" }}>{slide.subtitle}</span>
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    background: "white",
                    color: "black",
                    borderRadius: "1rem",
                    textDecoration: "none",
                  }}
                >
                  Read Case Studies
                </a>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={prevSlide}
          size="icon"
          variant="ghost"
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            padding: "0.5rem",
          }}
        >
          &#8249;
        </Button>
        <Button
          onClick={nextSlide}
          size="icon"
          variant="ghost"
          style={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
          }}
        >
          &#8250;
        </Button>
      </div>
    </div>
  );
};

export default Slider;
