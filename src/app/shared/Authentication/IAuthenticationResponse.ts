interface IAuthenticationResponse {
  errorMessage:string;
  user?:Object;
  jwt?:string;
}

export = IAuthenticationResponse;