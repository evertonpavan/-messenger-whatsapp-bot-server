import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

const fileFilter = (req, file, cb) => {

    const allowedMimes = [
        "application/json"
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error("Invalid file type."), false);
    }

}

const maxSize = 5 * 1024 * 1024;

const fileLimits = {
    fileSize: maxSize,
    files: 1,
}

const storage = multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
    },
})

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: fileLimits });

export { upload }
