from storages.backends.s3boto3 import S3Boto3Storage

# Custom storage backend for media files
class S3MediaStorage(S3Boto3Storage):
    location = 'media'
    file_overwrite = False

# Custom storage backend for static files
class S3StaticStorage(S3Boto3Storage):
    location = 'static'
