export class MetaPayloadDto {
  current_page: number;
  next_page: boolean;
  page_size: number;
  total_data: number;
}

export class PaginationResultDto<T = Record<string, any>> {
  items: T[];
  meta: MetaPayloadDto;
}

export class ErrorPayloadDto {
  code: number;
  message: string;
  details?: string[];
}

export class BaseResponseDto<T = null> {
  success: boolean;
  request_id: string;
  data: T;
  meta?: Record<keyof MetaPayloadDto, any>;
  error?: Record<keyof ErrorPayloadDto, any>;
}
