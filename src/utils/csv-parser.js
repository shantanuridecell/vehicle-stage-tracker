
/**
 * Parse a CSV file
 * @param {File} file - The CSV file to parse
 * @returns {Promise<Array>} The parsed CSV data
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csv = event.target.result;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map(header => header.trim());
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;
          
          const values = lines[i].split(",").map(value => value.trim());
          const entry = {};
          
          headers.forEach((header, index) => {
            entry[header] = values[index];
          });
          
          data.push(entry);
        }
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
