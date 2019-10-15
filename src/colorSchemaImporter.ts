import * as fs from "fs";

let dir = "./colorSchema";
let failList = [];

fs.readdir(dir, function(err, files) {
  if (err) throw err;

  let fileList = files.filter(function(file) {
    return (
      fs.statSync(dir + "/" + file).isFile() && /.*\.ts$/.test(dir + "/" + file)
    );
  });

  let importz = "";
  let exportz = "";
  fileList.map(file => {
    let fileName = file.replace(".ts", "");
    let imp = `import ${fileName} from './${fileName}';
    `;
    let exp = `
${fileName},
    `;
    importz = importz + imp;
    exportz = exportz + exp;
  });

  console.log(importz);
  console.log(exportz);
  fs.writeFileSync(
    `./colorSchema/index.ts`,
    `
 ${importz}

 export {
   ${exportz}
 };
  `
  );
  // try {
  //   fs.writeFileSync(`./index.ts`, `${file}`);
  // } catch (e) {
  //   console.log(e);
  //   failList.push(file);
  // }

  console.log(failList);
});
