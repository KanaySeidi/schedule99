import React, { useEffect, useState } from "react";
import home from "./Home.module.css";
import doska from "../../assets/img/blackboard.jpg";
import CityTime from "../../components/CityTime";
import { MenuItem, Select } from "@mui/material";
import { getSchedule } from "../../api/getSchedule";
import { useDispatch, useSelector } from "react-redux";
import { getIdGroup } from "../../api/getIdGroup";
import Cookies from "js-cookie";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState("Группа");
  const [id, setId] = useState();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.schedule.data);
  const idGroup = useSelector((state) => state.idGroup.data);
  console.log(idGroup);

  const dayOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const handleGroupChange = (event) => {
    const newSelectedGroup = event.target.value;
    console.log(newSelectedGroup);
    setSelectedGroup(newSelectedGroup);
    Cookies.set("lastSelectedGroup", newSelectedGroup, { expires: 2 });
  };

  const lastSelectedGroup = Cookies.get("lastSelectedGroup");
  useEffect(() => {
    dispatch(getIdGroup());
    if (lastSelectedGroup) {
      setSelectedGroup(lastSelectedGroup);
      const selectedGroup = idGroup.find(
        (item) => item.title === lastSelectedGroup
      );
      if (selectedGroup) {
        const groupId = selectedGroup.id;
        setId(groupId);
        dispatch(getSchedule({ groupId }));
      }
    }
  }, [idGroup, lastSelectedGroup]);

  const selectGroup = {
    color: "white",
    fontSize: "32px",
    width: "200px",
    fontFamily: "Chalk cyrillic freehand",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.3)",
    border: "1px solid gray",
    boxShadow: "0 0 10px rgba(0,0,0,0.6)",
  };

  if (window.matchMedia("(max-device-width: 768px)").matches) {
    selectGroup.width = "140px";
    selectGroup.fontSize = "15px";
  }

  if (window.matchMedia("(max-device-width: 425px)").matches) {
    selectGroup.width = "140px";
    selectGroup.fontSize = "15px";
  }

  const menuItemStyle = {
    color: "black",
    fontSize: "22px",
    padding: "8px",
    fontFamily: "Chalk cyrillic freehand",
    fontWeight: "normal",
  };

  if (window.matchMedia("(max-device-width: 768px)").matches) {
    menuItemStyle.fontSize = "20px";
  }

  if (window.matchMedia("(max-device-width: 425px)").matches) {
    menuItemStyle.fontSize = "10px";
  }

  const containerStyle = {
    height: "100vh",
    backgroundImage: `url(${doska})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // Создайте переменную для хранения предыдущего дня недели
  let prevDayOfWeek = "";

  return (
    <>
      <div className={home.section} style={containerStyle}>
        <div className={home.container}>
          <h3>Расписание учебного заведения</h3>

          <div className={home.currentTime}>
            <CityTime city="Бишкек" timeZoneOffset={0} />
          </div>
          <div className={home.txt}>
            <div className={home.group1}>Выберите группу</div>
            <div className={home.group1}>
              <Select
                style={selectGroup}
                value={selectedGroup}
                onChange={handleGroupChange}
                defaultValue="default"
              >
                <MenuItem style={menuItemStyle} value="Группа" disabled>
                  Группа
                </MenuItem>
                {idGroup.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => setId(item.id)}
                    style={menuItemStyle}
                    value={item.title}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className={home.info}>
            {dayOfWeek.map((day) => {
              const filteredData = data.filter((item) => item.day === day);
              const sortedData = [...filteredData].sort((a, b) =>
                a.lesson_time.lessons.localeCompare(b.lesson_time.lessons)
              );
              return (
                <div key={day}>
                  {sortedData.map((item, index) => {
                    // Определите текущий день недели
                    const currentDay = item.day;

                    // Проверьте, был ли день недели уже отображен
                    const isFirstLessonOfDay = currentDay !== prevDayOfWeek;

                    // Обновите предыдущий день недели
                    prevDayOfWeek = currentDay;

                    return (
                      <div key={item.id}>
                        {isFirstLessonOfDay && (
                          <div>
                            <p className={home.infoDay}>{item.day}</p>
                          </div>
                        )}
                        {index === 0 && (
                          <div className={home.schedule}>
                            <div className={home.lesson}>УРОК</div>
                            <div className={home.time}>ВРЕМЯ</div>
                            <div className={home.subject}>ПРЕДМЕТ</div>
                            <div className={home.mentor}>ПРЕПОДАВАТЕЛЬ</div>
                            <div className={home.room}>КАБИНЕТ</div>
                          </div>
                        )}
                        <div className={home.schedule}>
                          <div className={home.lesson}>
                            {item.lesson_time.lessons}
                          </div>
                          <div className={home.time}>
                            {item.lesson_time.time}
                          </div>
                          <div className={home.subject}>
                            {item.subject.title}
                          </div>
                          <div className={home.mentor}>
                            {item.teacher
                              .map((teacher) => teacher.fullname)
                              .join(", ")}
                          </div>
                          <div className={home.room}>
                            {item.classroom
                              .map((room) => room.title)
                              .join(", ")}
                          </div>
                        </div>
                        <div className={home.lessonLine} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
