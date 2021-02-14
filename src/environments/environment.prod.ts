export const environment = {
  production: true,
  serverURL: (location) => {
    return "/"
    // return "http://" + location.host + "/";
  },
};
