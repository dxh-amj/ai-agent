import type { GoogleCredentials } from "../types";

const useGoogleLogin = ({
  clientId,
  redirectUri,
  authorizeUrl,
  scope,
  responseType,
  prompt,
  accessType,
  state,
}: GoogleCredentials) => {
  const handleGoogleLogin = () => {
    const url = new URL(authorizeUrl);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: responseType,
      prompt: prompt,
      access_type: accessType,
      state: state,
    });

    url.search = params.toString();
    window.location.href = url.toString();
  };

  return { handleGoogleLogin };
};

export { useGoogleLogin };
