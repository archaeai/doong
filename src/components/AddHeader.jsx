import { useContext } from "react";
import { CatContext } from "../contexts/CatContext";

export default function AddHeader({ openModal }) {
  const { cats, selectCat } = useContext(CatContext);

  return (
    <header>
      <nav>
        {cats.map((cat) => (
          <button key={cat.id} onClick={() => selectCat(cat)}>
            {cat.name}
          </button>
        ))}
        <button onClick={openModal}>+</button>
      </nav>
    </header>
  );
}

// import React, { useState } from "react";
// import CatProfile from "./ProfileCard";

// export default function AddHeader() {
//   const [tabs, setTabs] = useState([]);
//   const [activeTab, setActiveTab] = useState(null);

//   const addNewTab = () => {
//     const newTabName = prompt("고양이 이름을 입력하세요:");
//     if (newTabName) {
//       setTabs([...tabs, newTabName]);
//       setActiveTab(tabs.length); // 새로운 탭이 활성화됨
//     }
//   };

//   return (
//     <div className="tab-container">
//       <div className="tabs">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`tab ${activeTab === index ? "active" : ""}`}
//             onClick={() => setActiveTab(index)}
//           >
//             {tab}
//           </button>
//         ))}
//         <button className="tab" onClick={addNewTab}>
//           {tabs.length === 0 ? "추가하기" : "+"}
//         </button>
//       </div>
//       {tabs.map((tab, index) => (
//         <CatProfile key={index} name={tab} active={activeTab === index} />
//       ))}
//     </div>
//   );
// }
