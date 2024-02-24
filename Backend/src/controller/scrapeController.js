const axios = require('axios');
const cheerio = require('cheerio');
module.exports = {
  getData: async(req, res) => {
    const product = req.query.keyWord;
    const data = [];
    try{
      const headers = {
        'User-Agent': process.env.USER_AGENT
      };
      const response = await axios.get(`${process.env.AMAZON_URL}/s?k=${product}&page=1`, {headers});
      const $ = cheerio.load(response.data);

      $('.puis-card-container').each((i, element) => {
        const title = $(element).find('.a-size-base-plus').text();
        const rating = $(element).find('.a-declarative .a-icon-star-small .a-icon-alt').text();
        const reviewsNumber = $(element).find('.a-declarative .a-size-base .s-underline-text').text();
        const url = $(element).find('.s-image').attr('src');
        const productData = {title, rating, reviewsNumber, url};
        data.push(productData)
      })

      return res.json(data);
    } catch (error){
      console.log('[ERROR]: ', error);
      return res.status(error.response.status).json(error);
    }
  }
}