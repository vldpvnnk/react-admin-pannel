export default interface ApiErrorResponse{
    response?: {
      data?: {
        errors?: Record<string, string[] | string>;
      };
    };
  };

export default interface TagFormValues {
    code: string;
    name: string;
    sort: number;
  };