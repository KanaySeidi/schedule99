import React from "react";
import main from "./Design2.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../api/getSchedule";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Design2 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.schedule.data);
  console.log(data);
  const dayOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const groups = ["group1", "group2", "group3"];

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getSchedule());
  };

  const reload = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  return (
    <>
      <div className={main.section}>
        <div className={main.container}>
          <h2 className={main.txt}>Расписание учебного заведения</h2>
          <div className={main.group}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Выберите группу
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem onClick={handleClick}>AC 1/2-22</MenuItem>
                <MenuItem onClick={reload}>AC 3/4-22</MenuItem>
                <MenuItem onClick={reload}>AC 5/6-22</MenuItem>
              </Select>
            </FormControl>
          </div>

          {dayOfWeek.map((day) => {
            const filteredData = data.filter((item) => item.day === day);
            const sortedData = [...filteredData].sort((a, b) =>
              a.lesson_time.lessons.localeCompare(b.lesson_time.lessons)
            );
            return (
              <div className={main.list} key={day}>
                <div className={main.item}>{day}</div>
                {sortedData.map((item, index) => (
                  <div key={item.id} className={main.card}>
                    {index === 0 && (
                      <table>
                        <thead>
                          <tr>
                            <th>Группа</th>
                            <th>Урок</th>
                            <th>Время</th>
                            <th>Предмет</th>
                            <th>Аудитории</th>
                            <th>Преподаватели</th>
                          </tr>
                        </thead>
                      </table>
                    )}
                    <table>
                      <tbody>
                        <tr>
                          <td>{item.group.title}</td>
                          <td>{item.lesson_time.lessons}</td>
                          <td className={main.time}>{item.lesson_time.time}</td>
                          <td>{item.subject.title}</td>
                          <td>
                            {item.classroom
                              .map((room) => room.title)
                              .join(", ")}
                          </td>
                          <td>
                            {item.teacher
                              .map((teacher) => teacher.fullname)
                              .join(", ")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Design2;
