const apiKey = "AIzaSyBRBt5EqVpvPvSHr9qBpYcgxKN9qNkdWP0";
const searchBaseUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&keyword=";
const detailsBaseURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=";


const GoogleMaps = {
  async search(name, latitude, longitude) {
      let id = await this.searchId(name, latitude, longitude);
      if (id) {
        return this.searchWebPage(id);
      }
    },

  async searchId(name, latitude, longitude) {
    try {
      let response = await fetch(`${searchBaseUrl}${name}&location=${latitude},${longitude}&key=${apiKey}`);
      if (response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.status === "OK") {
          return jsonResponse.results[0].place_id;
        } else if (jsonResponse.status === "OVER_QUERY_LIMIT") {
          return jsonResponse.status;
        } else {
          return false;
        }
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error);
    }
  },

  async searchWebPage(placeId) {
    try {
      let response = await fetch(`${detailsBaseURL}${placeId}&key=${apiKey}`);
      if (response.ok) {
        let jsonResponse = await response.json()
        console.log('webpage returned');
        return jsonResponse.result.website;
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error);
    }
  }
}

export default GoogleMaps;
