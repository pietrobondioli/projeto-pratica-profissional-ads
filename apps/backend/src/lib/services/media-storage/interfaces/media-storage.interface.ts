export interface MediaFile {
  buffer: Buffer;
  originalname: string;
  fieldname: string;
  mimetype: string;
  size: number;
}

export interface Media {
  key: string;
  bucket: string;
  eTag?: string;
  versionId?: string;
  mimeType: string;
  size: number;
}

export interface MediaStorageService {
  uploadFile(file: MediaFile): Promise<Media>;
}
