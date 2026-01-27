import { toCamelCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";

export interface ContactDTO {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// const CONTACT_URL = "/api/v1/contact/";

const SIMULATED_API_DELAY_MS = 1500;

export const sendContactMessage = async (_data: ContactDTO): Promise<ContactResponse> => {
  try {
    // Simulating API call with delay for now
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY_MS));

    // Fake successful response
    const fakeResponse = {
      data: {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      },
    };

    // When real API is ready:
    // const response = await axios.post(CONTACT_URL, data);
    // const transformedData = toCamelCase(response.data);
    // return transformedData;

    return toCamelCase(fakeResponse.data);
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
