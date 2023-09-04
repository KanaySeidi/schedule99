import React, { useEffect, useState } from "react";
import home from "./Home.module.css";
import doska from "../../assets/img/blackboard.jpg";
import CityTime from "../../components/CityTime";
import { MenuItem, Select } from "@mui/material";
import { getSchedule } from "../../api/getSchedule";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState("Группа");
  const [id, setId] = useState();

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

  const handleGroupChange = (event) => {
    const newSelectedGroup = event.target.value;
    setSelectedGroup(newSelectedGroup);
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSchedule({ groupId: id }));
      console.log("Меня нажали");
    }
  }, [id]);

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

  return (
    <>
      <div className={home.section}>
        <img className={home.mainBG} src={doska} alt="" />
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
                <MenuItem
                  onClick={(e) => setId(1)}
                  style={menuItemStyle}
                  value="ВП 1/2 - 23"
                >
                  ВП 1/2 - 23
                </MenuItem>
                <MenuItem
                  onClick={(e) => setId(2)}
                  style={menuItemStyle}
                  value="ВП 3/4 - 23"
                >
                  ВП 3/4 - 23
                </MenuItem>

                <MenuItem style={menuItemStyle} value="ВП 5/6 - 23">
                  ВП 5/6 - 23
                </MenuItem>
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
                  {sortedData.map((item, index) => (
                    <div key={item.id}>
                      <div>
                        <p className={home.infoDay}>{item.day}</p>
                      </div>
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
                        <div className={home.time}>{item.lesson_time.time}</div>
                        <div className={home.subject}>{item.subject.title}</div>
                        <div className={home.mentor}>
                          {item.teacher
                            .map((teacher) => teacher.fullname)
                            .join(", ")}
                        </div>
                        <div className={home.room}>
                          {item.classroom.map((room) => room.title).join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
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
