import axios, { AxiosError } from "axios";
import { useState, useCallback } from "react";

// Types
interface UploadState {
  isUploading: boolean;
  uploadedUrl: string | null;
  error: string | null;
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
}

interface CloudinaryConfig {
  readonly CLOUD_NAME: string;
  readonly UPLOAD_PRESET: string;
  readonly MAX_FILE_SIZE: number; // in bytes
  readonly ALLOWED_FORMATS: readonly string[];
}

// Configuration
const CLOUDINARY_CONFIG: CloudinaryConfig = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ["image/jpeg", "image/png", "image/webp"] as const,
} as const;

// Custom error class
class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

const useCloudinaryUpload = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    uploadedUrl: null,
    error: null,
  });

  const validateFile = useCallback((file: File): void => {
    if (!file) {
      throw new UploadError("No file selected");
    }

    if (!CLOUDINARY_CONFIG.ALLOWED_FORMATS.includes(file.type)) {
      throw new UploadError(
        `Invalid file format. Allowed formats: ${CLOUDINARY_CONFIG.ALLOWED_FORMATS.join(", ")}`
      );
    }

    if (file.size > CLOUDINARY_CONFIG.MAX_FILE_SIZE) {
      throw new UploadError(
        `File size exceeds ${CLOUDINARY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB limit`
      );
    }
  }, []);

  const createFormData = useCallback((file: File): FormData => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIG.UPLOAD_PRESET);
    return formData;
  }, []);

  const uploadImage = useCallback(
    async (files: FileList | null): Promise<void> => {
      if (!files?.length) {
        setState((prev) => ({ ...prev, error: "No file selected" }));
        return;
      }

      setState((prev) => ({ ...prev, isUploading: true, error: null }));

      try {
        const file = files[0];
        validateFile(file);

        const formData = createFormData(file);
        const response = await axios.post<CloudinaryResponse>(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setState((prev) => ({
          ...prev,
          uploadedUrl: response.data.secure_url,
          isUploading: false,
        }));
      } catch (error) {
        let errorMessage = "Failed to upload image";

        if (error instanceof UploadError) {
          errorMessage = error.message;
        } else if (error instanceof AxiosError) {
          errorMessage = error.response?.data?.message || error.message;
        }

        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isUploading: false,
        }));
      }
    },
    [validateFile, createFormData]
  );

  const resetUpload = useCallback(() => {
    setState({
      isUploading: false,
      uploadedUrl: null,
      error: null,
    });
  }, []);

  return {
    uploadImage,
    resetUpload,
    isUploading: state.isUploading,
    error: state.error,
    uploadedUrl: state.uploadedUrl,
  } as const;
};

export type { UploadState, CloudinaryResponse, CloudinaryConfig };
export default useCloudinaryUpload;
