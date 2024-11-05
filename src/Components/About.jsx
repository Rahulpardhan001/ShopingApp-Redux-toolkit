// import React, { useState } from "react";
// import { RxCross2 } from "react-icons/rx";

// const About = () => {
//   const [chips, setChips] = useState("");
//   const [chipsStore, setChipsStore] = useState([]);
//   const [toggle, setToggle] = useState(false);

//   const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-gray-500"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newChip = {
//       text: chips,
//       color: colors[chipsStore.length % colors.length], // Cycle through colors
//     };
//     setChipsStore([...chipsStore, newChip]);
//     setChips("");
//   };
//   const handleDel = (id) => {
//     const update = chipsStore.filter((curElem, i) => i !== id);
//     setChipsStore(update);
//   };
//   const handleAllDel = () => {
//     setChipsStore([]);
//   };

  
//   return (
//     <>
//       <div className="container flex justify-center  mb-24  mt-32">
//         <div className="border flex w-[50%] min-h-20 items-center gap-3 flex-wrap rounded-md p-4 relative">
//           {chipsStore.map((curElem, i) => (
//             <span
//               key={i}
//               className={`flex gap-2 items-center border-none rounded-xl p-1 ps-2 text-white ${curElem.color} `}
//             >
//               {curElem.text}{" "}
//               <RxCross2
//                 className={`border rounded-full ${curElem.color} `}
//                 onClick={() => handleDel(i)}
//               />
//             </span>
//           ))}

//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={chips}
//               onChange={(e) => setChips(e.target.value)}
//               className="outline-none  rounded-md ps-2 pe-2 pt-1 pb-1   placeholder-gray-400 "
//               autoFocus
//               placeholder="Type and press"
//             />
//             <button type="submit"></button>
//           </form>

//           {chipsStore.length > 0 && (
//             <span className="">
//               <RxCross2
//                 className="absolute end-4 top-6 border rounded-full bg-slate-900 border-none text-2xl p-1 text-white"
//                 onClick={handleAllDel}
//               />
//             </span>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default About;


import React, { useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController);

const About = () => {
  const ecgData = {
  //  labels : Utils.months({count: 7}),
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'ECG Signal',
        data: [0, 0.5, -0.2, 1, 0, -1, 0.2, 0.5, 0, -0.7, 0, 0.4, -0.3, 1, 0, -0.5, 0.2, 0.6, -0.1, 0],
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: true },
      y: { min: -1.5, max: 1.5 },
    },
    elements: {
      line: { tension: 0.2 },
    },
    
  };

  useEffect(() => {
    return () => {
      // Clean up chart instance on unmount
      Chart.getChart("ecg-chart")?.destroy();
    };
  }, []);

  return (
    <div className="p-5 font-sans bg-gray-100">
      <div className="mb-4 text-center text-red-600 font-bold text-xl">
        ECG
      </div>
      <div className="text-center mb-4 text-gray-800">
        <p>ID: CEB14A20</p>
        <p>Battery level: 100%</p>
        <p>Firmware: 3.2.0</p>
      </div>
      <div className="text-center text-6xl text-red-600 font-semibold">78</div>
      <div className="text-center text-lg text-blue-400">(770ms)</div>
      <div className="mt-6 border-spacing-64 ">
        <Line data={ecgData} options={options} className='' id="ecg-chart" />
      </div>
    </div>
  );
};

export default React.memo(About);
