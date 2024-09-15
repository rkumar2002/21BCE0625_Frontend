
import React, { useState } from 'react';
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
  fetchFilteredData: (status: string[] | null) => void; // Add a callback for fetching filtered data
}

const ResultList: React.FC<Props> = ({ data, fetchFilteredData }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all'); // default is 'All'
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list'); // Default view mode is 'list'

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
      case 'others': // Adding "Others" as a status color
        return '#4380ec'; // Blue for "Others"
      default:
        return '#4380ec'; // Default blue
    }
  };

  const extractFirstWord = (text: string) => {
    return text?.split(' ')[0]; // Extracts only the first word
  };

  // Handle status filter button clicks
  const handleFilterClick = (status: string | null) => {
    setSelectedStatus(status || 'all'); // Update selected status
    if (status && status !== 'all') {
      fetchFilteredData([status]); // Call the parent function with the selected status
    } else {
      fetchFilteredData(null); // Reset to no filter when 'All' is clicked
    }
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
  };

  return (
    <div className="result-list p-6 w-full">
      {Array.isArray(data) && data.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="flex flex-row">
          {/* Table or Grid View */}
          <div className={`flex-1 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
            {viewMode === 'list' ? (
              <table className="w-full border-collapse table-auto">
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
            ) : (
              data.map((item) => (
                <div key={item._id} className="bg-white shadow-md p-4 rounded-lg">
                  <div className="text-gray-600 text-sm font-semibold">{extractFirstWord(item._source.mark_identification)}</div>
                  <p className="font-semibold text-gray-800">{item._source.mark_identification}</p>
                  <p className="text-gray-600">{item._source.current_owner}</p>
                  <p className="text-gray-500">{item._id}</p>
                  <p className="text-gray-500">{convertTimestamp(item._source.registration_date)}</p>
                  <div className="flex items-center mt-2">
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
                  <p className="truncate text-gray-500">
                    {item._source.mark_description_description && item._source.mark_description_description.length > 0
                      ? item._source.mark_description_description[0]?.substring(0, 50) + '...'
                      : 'No description available'}
                  </p>
                  <p className="text-gray-500">{`Class ${item._source.class_codes.join(', ')}`}</p>
                </div>
              ))
            )}
          </div>

          {/* Filter and Display Section */}
          <div className='ml-4 flex flex-col gap-4 w-3/12'>
  <div className='bg-white shadow-sm p-5 rounded-md'>
    <p className='font-bold mb-2'>Status</p>
    <div className='flex flex-wrap flex-row gap-3'>
      <button
        className={`border py-2 px-4 rounded-lg ${selectedStatus === 'all' ? 'border-sky-500 text-sky-500' : 'hover:border-sky-500 hover:text-sky-500'}`}
        onClick={() => handleFilterClick(null)} // Reset to 'All' when clicked
      >
        <span className='font-light'>All</span>
      </button>

      <button
        className={`border py-2 px-4 rounded-lg ${selectedStatus === 'registered' ? 'border-green-600 text-green-600' : 'hover:border-green-600 hover:text-green-600'}`}
        onClick={() => handleFilterClick('registered')}
      >
        <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: '#41B65C' }}></span>
        <span className='font-light'>Registered</span>
      </button>

      <button
        className={`border py-2 px-4 rounded-lg ${selectedStatus === 'pending' ? 'border-yellow-500 text-yellow-500' : 'hover:border-yellow-500 hover:text-yellow-500'}`}
        onClick={() => handleFilterClick('pending')}
      >
        <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: '#ECC53C' }}></span>
        <span className='font-light'>Pending</span>
      </button>

      <button
        className={`border py-2 px-4 rounded-lg ${selectedStatus === 'abandoned' ? 'border-red-600 text-red-600' : 'hover:border-red-600 hover:text-red-600'}`}
        onClick={() => handleFilterClick('abandoned')}
      >
        <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: '#EC3C3C' }}></span>
        <span className='font-light'>Abandoned</span>
      </button>

      <button
        className={`border py-2 px-4 rounded-lg ${selectedStatus === 'others' ? 'border-blue-500 text-blue-500' : 'hover:border-blue-500 hover:text-blue-500'}`}
        onClick={() => handleFilterClick('others')}
      >
        <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: '#4380ec' }}></span>
        <span className='font-light'>Others</span>
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
  {/* Display Options */}
  <div className='bg-white shadow-sm p-5 rounded-md'>
    <p className='font-bold mb-2'>Display</p>
    <div className="flex justify-center w-full">
      <nav className="flex items-center p-1 w-full text-sm text-gray-600 bg-gray-200 rounded-xl">
        <button
          role="tab"
          type="button"
          className={`flex-1 h-10 px-4 rounded-lg outline-none ${viewMode === 'grid' ? 'bg-white text-black font-bold shadow-md' : 'bg-gray-200 text-black font-bold'}`}
          onClick={() => handleViewModeChange('grid')} // Handle Grid View
        >
          Grid View
        </button>
        <button
          role="tab"
          type="button"
          className={`flex-1 h-10 px-4 rounded-lg outline-none ${viewMode === 'list' ? 'bg-white text-black font-bold shadow-md' : 'bg-gray-200 text-black font-bold'}`}
          onClick={() => handleViewModeChange('list')} // Handle List View
        >
          List View
        </button>
      </nav>
    </div>
  </div>
</div>

        </div>
      )}
    </div>
  );
};

export default ResultList;


