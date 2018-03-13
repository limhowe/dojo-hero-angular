export class Common {
  /**
  * Check if the app is running on a browser
  */
  public static isBrowser() {
    try {
      return (document) ? true : false;
    } catch (e) {
      return false;
    }
  }

  /**
  * Safety json parser
  */
  public static jsonParse(_data) {
    try {
      return JSON.parse(_data.resp);
    } catch (e) {
      return {
        error: 'Invalid server response. Please try it again.',
      };
    }
  }
}
