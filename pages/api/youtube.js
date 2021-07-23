const cheerio = require("cheerio");

export default async (req, res) => {
  if (req.method === "POST") {
    const id = req.body.youtubeId;
    console.log(id);
    try {
      const response = await fetch(
        `https://www.yt-download.org/api/widget/mp3/${id}`
      );

      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const links = $("a");
      const validUrls = [];

      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.attribs.href;
        if (href.includes(`https://www.yt-download.org/download/${id}/mp3`)) {
          validUrls.push({
            cover: `https://img.youtube.com/vi/${id}/0.jpg`,
            link: href,
          });
        }
      }

      return res.json({
        data: validUrls,
      });
    } catch (e) {
      res.json(e);
      res.status(405).end();
    }
  }
};
