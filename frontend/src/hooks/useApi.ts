import { toast } from "react-toastify";
import { useState } from "react";
import { AxiosResponse } from "axios";

interface useApiProps<TArgs extends any[], TResponse> {
  apiCall: (...args: TArgs) => Promise<AxiosResponse<TResponse>>; //any api-request function that returns axios promise
  onSuccess?: (data: TResponse) => void;
  errorMessage: string;
}

export const useApi = <TArgs extends any[], TResponse>({apiCall, onSuccess, errorMessage}: useApiProps<TArgs, TResponse>) => {
  const [data, setData] = useState<TResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (...args: TArgs) => {
    try {
      setIsLoading(true);
      const response = await apiCall(...args);
      setData(response.data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : errorMessage; //we show errorMessage only if error is unknown
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { callApi, data, isLoading };
};
