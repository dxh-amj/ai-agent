import toast from "react-hot-toast";

import axios from "axios";

const handleApiError = (error: any, customMessage?: string) => {
  if (customMessage) {
    toast.error(customMessage);
    return;
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error;
    if (axiosError.response) {
      const status = axiosError.response.status;
      const message =
        axiosError.response.data?.message ??
        (() => {
          switch (status) {
            case 400:
              return "Please check your inputs.";
            case 401:
              return "Unauthorized! Please log in.";
            case 403:
              return "You don't have permission to access this resource.";
            case 404:
              return "The requested resource could not be found.";
            case 500:
              return "Something went wrong! Please try again later.";
            default:
              return `Error: ${status} - An error occurred.`;
          }
        })();

      toast.error(message);
      console.error("Server Error:", axiosError.response.data);
    } else if (axiosError.request) {
      toast.error("No response received from the server.");
      console.error("Request Error:", axiosError.request);
    } else {
      toast.error("Request setup error.");
      console.error("Request Setup Error:", axiosError.message);
    }
  } else {
    toast.error("An unexpected error occurred.");
    console.error("Unexpected Error:", error);
  }
};

export { handleApiError };
