const CHANGE_ROUTE_EVENT = 'locationChange';

/**
 *
 * @param {string} url - direction name
 */
const changeRoute = (url) => {
  window.history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
};
export default changeRoute;
