import React, { useEffect, useState } from "react";
import home from "./Home.module.css";
import axios from "axios";
import { MockAPI } from "../../utils/const";

const Home = () => {
  const [data, setData] = useState([]);
  const dayOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const getSchedule = async () => {
    try {
      const res = await axios.get(MockAPI);
      setData(res.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <div className={home.section}>
        <div className={home.container}>
          <h2 className={home.txt}>Расписание учебного заведение</h2>
          <div className={home.schedule}>
            {dayOfWeek.map((day) => (
              <div className={home.list} key={day}>
                <div className={home.item}>{day}</div>
                {data
                  .filter((item) => item.day === day)
                  .map((item) => (
                    <ul key={item.id}>
                      <li>{item.course}</li>
                      <li>{item.time}</li>
                      <li>{item.mentor}</li>
                    </ul>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
