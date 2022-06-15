import axios from "axios";

class AddressApi {
  async fetch(address) {
    return await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
    );
  }
}

export default new AddressApi();
