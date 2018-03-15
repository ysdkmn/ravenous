const apiKey = "yu_a7NKXDSsj72pao70LOuGPVKutq8oJHO14acF5jxC-njefi8QEp2KMNvRQGZYKRUMaViYJvQI0rGaOPrjakANcpu9mXwIkJ-LYq-2_XVoRS7ulk9KTYiNn7Y-dWnYx";

const Yelp = {
  async search(term, location, sortBy) {
    try {
      let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&categories=food,restaurants&sort_by=${sortBy}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            return ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
              latitude: business.coordinates.latitude,
              longitude: business.coordinates.longitude,
              url: business.url,
              googleMapUrl: `https://www.google.com/maps/search/?api=1&query=${business.name}`
            });
          });
        }
      }
      throw new Error('Request failed!');
  } catch(error) {
    console.log(error);
  }
}
}

export default Yelp;
