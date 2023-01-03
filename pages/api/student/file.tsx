import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    //console.log(fields.id);
   let url= await saveFile(files.file, fields.id);
    return res.status(201).json({sucess:true,url:url});
  });
};

const saveFile = async (file,id) => {
  let filename="./public/uploads/"+id+file.originalFilename;
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(filename, data);
  await fs.unlinkSync(file.filepath);
  return filename;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
