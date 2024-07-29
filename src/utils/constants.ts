
export const TimeFormat = 'HH:mm:ss';  
export const INTERVAL_TIME = 1000;
export const IpValidationRegexp =  /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  
export enum ErrorMessages {
  INVALID_IP = 'Invalid IP address format',
  NETWORK_ERROR = 'Network error or no response received',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  UNEXPECTED_ERROR = 'Unexpected error occurred',
};

export const Translations = {
  EN: {
    DESCRIPTION: 'Enter one or more IP addresses and get their country',
    INPUT_PLACEHOLDER: 'Leave empty to get your current IP',
    ADD_BUTTON_LABEL: 'Add',
  }
};