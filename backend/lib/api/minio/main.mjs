import Minio from "minio";
import config from "#messx-global-config";

export default function () {
	const minioClient = new Minio.Client({
		endPoint: "play.min.io",
		port: 9000,
		useSSL: true,
		accessKey: config.minio.MINIO_ACCESS_KEY,
		secretKey: config.minio.MINIO_SECRET_KEY
	});

	minioClient.bucketExists("mybucket", function(err, exists) {
		if (err) {
			minioClient.makeBucket("mybucket", "us-east-1", function(err) {
				if (err) return console.log("Error creating bucket.", err);
				console.log("Bucket created successfully in \"us-east-1\".");
			});
		}
		if (exists) {
			minioClient.listBuckets(function(err, buckets) {
				if (err) return console.log(err);
				console.log("buckets :", buckets);
			});
		}
	});

	return minioClient;
}