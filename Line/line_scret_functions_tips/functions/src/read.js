const fs = require("fs").promises;
const path = require("path");
pathEnum = {
  fun: "sweet.json",
};
const concatMessage = (msgs) => msgs.join("\n");

const readFile = async(filePath) => {
  const file = path.join(__dirname, filePath);
  try {
    const data = await fs.readFile(file, "utf8");

    if (!data) {
      return null;
    } else {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(`Error reading file from disk: ${err}`);
    return null;
  }
};

// Debug attach hit run current file

const getMessages = async(fPath, index, rating) => {
  const debugMsg = `Type : ${fPath || ""} Index: ${index || ""} : Rating : ${
    rating || ""
  } `;
  console.log(debugMsg);
  const data = await readFile(`funnydb/${fPath || pathEnum.fun}`);
  if (!data) 
    return "Not found on " + debugMsg;
    const filtered = rating ? 
        data.filter((d) => d.rating >= rating) // can not use data = ( not mutable )
        : data;
  if (!index || index == -1) 
    index = Math.floor(Math.random() * (data.length-1)); // * max

const result = concatMessage(filtered[index].message);
return result;
};

getMessages(pathEnum.fun, -1, 1);

module.export  = {
    getMessages,
    pathEnum,
}