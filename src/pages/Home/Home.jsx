import React, { useState } from "react";
import home from "./Home.module.css";
import doska from "../../assets/img/blackboard.jpg";
import CityTime from "../../components/CityTime";
import { MenuItem, Select } from "@mui/material";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState("Группа");

  const handleGroupChange = (event) => {
    const newSelectedGroup = event.target.value;
    setSelectedGroup(newSelectedGroup);
  };

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
            <p className={home.group1}>Выберите группу</p>
            <p className={home.group1}>
              <Select
                style={selectGroup}
                value={selectedGroup}
                onChange={handleGroupChange}
                defaultValue="default"
              >
                <MenuItem style={menuItemStyle} value="Группа" disabled>
                  Группа
                </MenuItem>
                <MenuItem style={menuItemStyle} value="ВП 1/2 - 23">
                  ВП 1/2 - 23
                </MenuItem>
                <MenuItem style={menuItemStyle} value="ВП 3/4 - 23">
                  ВП 3/4 - 23
                </MenuItem>
                <MenuItem style={menuItemStyle} value="ВП 5/6 - 23">
                  ВП 5/6 - 23
                </MenuItem>
              </Select>
            </p>
          </div>
          <div className={home.info}>
            <p className={home.infoDay}>Суббота 2.09</p>
            <div className={home.schedule}>
              <div className={home.lesson}>УРОК</div>
              <div className={home.time}>ВРЕМЯ</div>
              <div className={home.subject}>ПРЕДМЕТ</div>
              <div className={home.mentor}>ПРЕПОДАВАТЕЛЬ</div>
              <div className={home.room}>КАБИНЕТ</div>
            </div>
            <div className={home.schedule}>
              <div className={home.lesson}>1-2</div>
              <div className={home.time}>8:00-9:35</div>
              <div className={home.subject}>ОБиП</div>
              <div className={home.mentor}>Оморов А.А</div>
              <div className={home.room}>213</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
