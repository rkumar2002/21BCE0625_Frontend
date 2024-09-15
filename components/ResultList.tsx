
import React from 'react';
import Image from 'next/image'; 
import circularIcon from '../public/circular-arrow.png';
import { FaSearch } from 'react-icons/fa';

interface Trademark {
  _id: string;
  _source: {
    mark_identification: string;
    current_owner: string;
    registration_date: number;
    status_date: number;
    renewal_date: number;
    status_type: string;
    mark_description_description: string[];
    class_codes: string[];
  };
}

interface Props {
  data: Trademark[];
}

const ResultList: React.FC<Props> = ({ data }) => {

  const convertTimestamp = (timestamp: number) => {
    if (!timestamp || isNaN(timestamp)) {
      return 'N/A'; // Default value for invalid timestamps
    }
    const date = new Date(timestamp * 1000);
    return date?.toISOString()?.split('T')[0];
  };

  const getStatusDotColor = (statusType: string) => {
    switch (statusType) {
      case 'registered':
        return '#41B65C'; // Green
      case 'pending':
        return '#ECC53C'; // Yellow
      case 'abandoned':
        return '#EC3C3C'; // Red
      default:
        return '#4380ec'; // Default blue
    }
  };

  const extractFirstWord = (text: string) => {
    return text?.split(' ')[0]; // Extracts only the first word
  };

  return (
    <div className="result-list p-6 w-full">
      {Array.isArray(data) && data.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className='flex flex-row'>
        <table className="w-11/12 border-collapse table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '20%' }}>Mark</th>
              <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '30%' }}>Details</th>
              <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '30%' }}>Status</th>
              <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '20%' }}>Class/Description</th>
            </tr>
          </thead>
          <tbody style={{ cursor: 'pointer' }}>
            {Array.isArray(data) && data.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                {/* Mark */}
                <td className="p-4">
                  <div className="bg-white shadow-md p-4 text-center rounded-lg">
                    <span className="text-gray-600 text-sm font-semibold">
                      {extractFirstWord(item._source.mark_identification)}
                    </span>
                  </div>
                </td>

                {/* Details */}
                <td className="p-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800">{item._source.mark_identification}</p>
                  <p className="text-gray-600">{item._source.current_owner}</p>
                  <div className="my-2" />
                  <p className="text-gray-500">{item._id}</p>
                  <p className="text-gray-500">{convertTimestamp(item._source.registration_date)}</p>
                </td>

                {/* Status */}
                <td className="p-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: getStatusDotColor(item._source.status_type) }}></span>
                    <p className="font-semibold text-gray-800">
                      {item._source.status_type.charAt(0).toUpperCase() + item._source.status_type.slice(1)}
                    </p>
                  </div>
                  <p className="text-gray-500 mt-1">on <span className="text-neutral-950 font-bold">{convertTimestamp(item._source.status_date)}</span></p>
                  <div className="mt-2 flex items-center">
                    <Image
                        src={circularIcon}
                        alt="Renewal Date"
                        width={13}
                        height={13}
                    />
                    <span className="text-gray-500 pl-2">{convertTimestamp(item._source.renewal_date)}</span>
                  </div>
                </td>

                {/* Class/Description */}
                <td className="p-4 text-sm text-gray-600">
                  <p className="truncate">
                    {item._source.mark_description_description && item._source.mark_description_description.length > 0
                      ? item._source.mark_description_description[0]?.substring(0, 50) + '...'
                      : 'No description available'}
                  </p>
                  <p className="text-gray-500">{`Class ${item._source.class_codes.join(', ')}`}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='ml-10 flex flex-col gap-10 w-4/12'>
        <div className='bg-white shadow-sm p-5 rounded-md'>
          <p className='font-bold mb-2'>Status</p>
          <div className='flex flex-wrap flex-row gap-3'>
            <button className="border py-2 px-4 rounded-lg hover:border-sky-500 hover:text-sky-500">
              <span className='font-light'>All</span>
            </button>

            <button className="border hover:border-green-600 py-2 px-4 rounded-lg hover:text-green-600">
              <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#41B65C"}}></span><span className='font-light'>Registered</span>
            </button>

            <button className="border hover:border-yellow-500 py-2 px-4 rounded-lg hover:text-yellow-500">
              <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#ECC53C"}}></span><span className='font-light'>Pending</span>
            </button>

            <button className="border hover:border-red-600 py-2 px-4 rounded-lg hover:text-red-600">
              <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#EC3C3C"}}></span><span className='font-light'>Abandoned</span>
            </button>

            <button className="border hover:border-blue-500 py-2 px-4 rounded-lg hover:text-blue-500">
              <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#4380ec"}}></span><span className='font-light'>Others</span>
            </button>
            
          </div>
        </div>
        
        <div className='bg-white shadow-sm p-5 rounded-md'>
          <div className='text-sm'>
            <span className='mr-4 cursor-pointer hover:font-bold'>Owners</span><span className='mr-4 cursor-pointer hover:font-bold'>Law Firms</span><span className='cursor-pointer hover:font-bold'>Attorneys</span>
          </div>

        <div className="flex items-center border border-gray-300 rounded-lg flex-grow mt-3">
        <FaSearch className="text-gray-500 ml-2" />
        <input
          type="text"
          placeholder="Search"
          className="border-none p-2 rounded-lg w-full focus:outline-none"
        />
        </div>
        
        <div className='my-5 h-20 overflow-auto pl-4'>
            <input type='checkbox' className='mr-3'/><span>Tesla, Inc. </span><br/>
            <input type='checkbox' className='mr-3'/><span>LegalForce RAPC </span><br/>
            <input type='checkbox' className='mr-3'/><span>Space X Inc.</span><br/>
            <input type='checkbox' className='mr-3'/><span>Tesla, Inc. </span><br/>
            <input type='checkbox' className='mr-3'/><span>Space X, Inc </span>
        </div>

        </div>
        
        <div className='bg-white shadow-sm p-5 rounded-md'>
          <p className='font-bold mb-2'>Display</p>
          
          <div className='p-4 px-2 rounded-md w-max' style={{backgroundColor : "#f1f1f1"}}>
            <span className='rounded-md hover:bg-white p-3 cursor-pointer'>List View</span>
            <span className='rounded-md hover:bg-white p-3 cursor-pointer'>Grid View</span>
          </div>
        
        </div>
      
      </div>
      </div>
      )}
    </div>
  );
};

export default ResultList;













































// import React from 'react';
// import Image from 'next/image'; 
// import circularIcon from '../public/circular-arrow.png';
// import { FaSearch } from 'react-icons/fa';

// interface Trademark {
//   _id: string;
//   _source: {
//     mark_identification: string;
//     current_owner: string;
//     registration_date: number;
//     status_date: number;
//     renewal_date: number;
//     status_type: string;
//     mark_description_description: string[];
//     class_codes: string[];
//   };
// }

// interface Props {
//   data: Trademark[];
// }

// const ResultList: React.FC<Props> = ({ data }) => {

//   const convertTimestamp = (timestamp: number) => {
//     if (!timestamp || isNaN(timestamp)) {
//       return 'N/A'; // Default value for invalid timestamps
//     }
//     const date = new Date(timestamp * 1000);
//     return date?.toISOString()?.split('T')[0];
//   };

//   const getStatusDotColor = (statusType: string) => {
//     switch (statusType) {
//       case 'registered':
//         return '#41B65C'; // Green
//       case 'pending':
//         return '#ECC53C'; // Yellow
//       case 'abandoned':
//         return '#EC3C3C'; // Red
//       default:
//         return 'gray'; // Default gray
//     }
//   };

//   const extractFirstWord = (text: string) => {
//     return text?.split(' ')[0]; // Extracts only the first word
//   };

//   return (
//     <div className="result-list p-6 w-full">
//       {Array.isArray(data) && data.length === 0 ? (
//         <p className="text-gray-500">No results found.</p>
//       ) : (
//         <div className='flex flex-row'>
//         <table className="w-11/12 border-collapse table-auto">
//           <thead>
//             <tr className="text-left bg-gray-100">
//               <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '20%' }}>Mark</th>
//               <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '30%' }}>Details</th>
//               <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '30%' }}>Status</th>
//               <th className="p-4 text-sm font-semibold text-gray-700" style={{ width: '20%' }}>Class/Description</th>
//             </tr>
//           </thead>
//           <tbody style={{ cursor: 'pointer' }}>
//             {Array.isArray(data) && data.map((item) => (
//               <tr key={item._id} className="border-t hover:bg-gray-50">
//                 {/* Mark */}
//                 <td className="p-4">
//                   <div className="bg-white shadow-md p-4 text-center rounded-lg">
//                     <span className="text-gray-600 text-sm font-semibold">
//                       {extractFirstWord(item._source.mark_identification)}
//                     </span>
//                   </div>
//                 </td>

//                 {/* Details */}
//                 <td className="p-4 text-sm text-gray-600">
//                   <p className="font-semibold text-gray-800">{item._source.mark_identification}</p>
//                   <p className="text-gray-600">{item._source.current_owner}</p>
//                   <div className="my-2" />
//                   <p className="text-gray-500">{item._id}</p>
//                   <p className="text-gray-500">{convertTimestamp(item._source.registration_date)}</p>
//                 </td>

//                 {/* Status */}
//                 <td className="p-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: getStatusDotColor(item._source.status_type) }}></span>
//                     <p className="font-semibold text-gray-800">
//                       {item._source.status_type.charAt(0).toUpperCase() + item._source.status_type.slice(1)}
//                     </p>
//                   </div>
//                   <p className="text-gray-500 mt-1">on <span className="text-neutral-950 font-bold">{convertTimestamp(item._source.status_date)}</span></p>
//                   <div className="mt-2 flex items-center">
//                     <Image
//                         src={circularIcon}
//                         alt="Renewal Date"
//                         width={13}
//                         height={13}
//                     />
//                     <span className="text-gray-500 pl-2">{convertTimestamp(item._source.renewal_date)}</span>
//                   </div>
//                 </td>

//                 {/* Class/Description */}
//                 <td className="p-4 text-sm text-gray-600">
//                   <p className="truncate">
//                     {item._source.mark_description_description && item._source.mark_description_description.length > 0
//                       ? item._source.mark_description_description[0]?.substring(0, 50) + '...'
//                       : 'No description available'}
//                   </p>
//                   <p className="text-gray-500">{`Class ${item._source.class_codes.join(', ')}`}</p>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className='ml-10 flex flex-col gap-10 w-4/12'>
//         <div className='bg-white shadow-sm p-5 rounded-md'>
//           <p className='font-bold mb-2'>Status</p>
//           <div className='flex flex-wrap flex-row gap-3'>
//             <button className="border py-2 px-4 rounded-lg hover:border-sky-500 hover:text-sky-500">
//               <span className='font-light'>All</span>
//             </button>

//             <button className="border hover:border-green-600 py-2 px-4 rounded-lg hover:text-green-600">
//               <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#41B65C"}}></span><span className='font-light'>Registered</span>
//             </button>

//             <button className="border hover:border-yellow-500 py-2 px-4 rounded-lg hover:text-yellow-500">
//               <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#ECC53C"}}></span><span className='font-light'>Pending</span>
//             </button>

//             <button className="border hover:border-red-600 py-2 px-4 rounded-lg hover:text-red-600">
//               <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#EC3C3C"}}></span><span className='font-light'>Abandoned</span>
//             </button>

//             <button className="border hover:border-blue-500 py-2 px-4 rounded-lg hover:text-blue-500">
//               <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{backgroundColor : "#4380ec"}}></span><span className='font-light'>Others</span>
//             </button>
            
//           </div>
//         </div>
        
//         <div className='bg-white shadow-sm p-5 rounded-md'>
//           <div className='text-sm'>
//             <span className='mr-4 cursor-pointer hover:font-bold'>Owners</span><span className='mr-4 cursor-pointer hover:font-bold'>Law Firms</span><span className='cursor-pointer hover:font-bold'>Attorneys</span>
//           </div>

//         <div className="flex items-center border border-gray-300 rounded-lg flex-grow mt-3">
//         <FaSearch className="text-gray-500 ml-2" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="border-none p-2 rounded-lg w-full focus:outline-none"
//         />
//         </div>
        
//         <div className='my-5 h-20 overflow-auto pl-4'>
//             <input type='checkbox' className='mr-3'/><span>Tesla, Inc. </span><br/>
//             <input type='checkbox' className='mr-3'/><span>LegalForce RAPC </span><br/>
//             <input type='checkbox' className='mr-3'/><span>Space X Inc.</span><br/>
//             <input type='checkbox' className='mr-3'/><span>Tesla, Inc. </span><br/>
//             <input type='checkbox' className='mr-3'/><span>Space X, Inc </span>
//         </div>

//         </div>
        
//         <div className='bg-white shadow-sm p-5 rounded-md'>
//           <p className='font-bold mb-2'>Display</p>
          
//           <div className='p-4 px-2 rounded-md w-max' style={{backgroundColor : "#f1f1f1"}}>
//             <span className='rounded-md hover:bg-white p-3 cursor-pointer'>List View</span>
//             <span className='rounded-md hover:bg-white p-3 cursor-pointer'>Grid View</span>
//           </div>
        
//         </div>
      
//       </div>
//       </div>
//       )}
//     </div>
//   );
// };

// export default ResultList;






