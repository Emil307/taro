import React from 'react';

const Select = ({options, defaultValue}) => {
  return (
    <select>
      {options.map(option => 
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      )}
    </select>
  )
}

export default Select;