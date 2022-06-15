export const FETCH_ADDRESS = "FETCH_ADDRESS";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const RESET_ADDRESS = "RESET_ADDRESS";
export const SUCCESS_RESET = "SUCCESS_RESET";
export const FETCH_FAILED = "FETCH_FAILED";

export function requestAddress(address) {
  return { type: FETCH_ADDRESS, payload: address };
}

export function resetAddresses() {
  return { type: RESET_ADDRESS };
}
