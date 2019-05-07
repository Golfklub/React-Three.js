export const config = (function() {
  var config = {};
  var q = window.location.search.substring(1);
  if (q === "") {
    return config;
  }
  var params = q.split("&");
  var param, name, value;
  for (var i = 0; i < params.length; i++) {
    param = params[i].split("=");
    name = param[0];
    value = param[1];
    // All config values are either boolean or float
    config[name] =
      value === "true" ? true : value === "false" ? false : parseFloat(value);
  }
  return config;
})();
