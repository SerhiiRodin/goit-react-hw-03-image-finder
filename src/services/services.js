export function fetchImages(thisInputValue, page) {
  const URL = `https://pixabay.com/api/?q=${thisInputValue}&page=${page}&key=33716265-9e8882647bb4a3033c82cecb5&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      } throw new Error('Connection error!!!');
    })
    .then(data => {
    //   if (data.hits.length === 0) {
    //     throw new Error('Nothing found!!!');
    //     // return console.log('Nothing found!!!');
    //   }
      return data;
    });
}
