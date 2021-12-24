import config from "../config/config.cjs";
import minio from "minio";

const minioClient = new minio.Client({
	endPoint: "play.min.io",
	port: 9000,
	useSSL: true,
	accessKey: config.MINIO_ACCESS_KEY,
	secretKey: config.MINIO_SECRET_KEY
});

export default function setImage(file, bucketName, inD = "us-east-1"){
	minioClient.makeBucket(bucketName, inD, function(err) {
		if (err) throw err;
		console.log(`Bucket created successfully in "${inD}".`);

		const metaData = {
			"Content-Type": "application/octet-stream",
			"X-Amz-Meta-Testing": 1234,
			"example": 5678
		};

		minioClient.fPutObject(bucketName, "photos-europe.tar", file, metaData, function(err, etag) {
			if (err) return console.log(err);
			console.log("File uploaded successfully.");
		});
	});
}
