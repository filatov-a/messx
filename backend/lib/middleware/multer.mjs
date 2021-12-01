import multer from "multer";
import path from "path";

const limits = {
	// fileSize: 1313131 * 31313131,
	files: 1,
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file);
		cb(null, path.join(path.resolve(), "./public/images"));
	},
	filename: (req, file, cb) => {
		const date = Date.now();
		const type = file.originalname.split(".")[1];
		if (type !== "jpg" && type !== "png") {
			console.log(type);
			cb(new Error("Undefined type of file. Must be jpg or png"));
			return;
		}
		cb(null, file.fieldname + "-" + date + "." + type);
	},
});

export default multer({ storage, limits });

