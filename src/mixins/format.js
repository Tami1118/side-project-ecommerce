// 檔名改為 dateFormat


// 2024.1.1
export const dateFormat = (date) => {
  return new Date(date * 1000).toLocaleDateString()
}

// 2024.01.01
export const dateDotted = (date) => {
  const formattedDate = new Date(date * 1000);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// 2024-1-1

// 2024-01-01
export const dateDash = (date) => {
  return date
}


// 2024/1/1

// 2024/01/01
