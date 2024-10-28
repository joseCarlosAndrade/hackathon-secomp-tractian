export interface ToolModel {
  code: string;
  name: string;
  quantity: number;
  manual: string;
}

export interface ServiceModel {
  title: string;
  description: string;
  suggestedSteps: string[];
  suggestedTools: ToolModel[];
  estimatedTime: number;
}

export interface ApiServiceResponse<T> {
  data: T;
  status: string;
  message?: string;
}