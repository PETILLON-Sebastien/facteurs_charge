import axios from "axios";

/* Helper Class
 * To make requesting countries and regions more flexible
 * */
class mapData {
  baseUrl = "https://code.highcharts.com/mapdata/";

  /* Helper Function
   * To get the countries of a specific region
   * */
  getWorld = async () => {
    return await axios.get(this.baseUrl + "countries/fr/custom/fr-all-mainland.geo.json");
  };
}

export default mapData;
