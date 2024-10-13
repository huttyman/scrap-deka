const projectList = [
    {
    name: 'aspire-asoke-ratchada',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-aspire-asoke-ratchada-%E0%B9%81%E0%B8%AD%E0%B8%AA%E0%B8%9B%E0%B8%B2%E0%B8%A2-%E0%B8%AD%E0%B9%82%E0%B8%A8%E0%B8%81-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2-6894/2'
  },
  {
    name: 'lumpini-park-rama-9-ratchada',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-lumpini-park-rama-9-ratchada-%E0%B8%A5%E0%B8%B8%E0%B8%A1%E0%B8%9E%E0%B8%B4%E0%B8%99%E0%B8%B5-%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-9-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2-5114'
  },
  {
    name: 'life-asoke-rama-9',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-life-asoke-rama-9-%E0%B9%84%E0%B8%A5%E0%B8%9F%E0%B9%8C-%E0%B8%AD%E0%B9%82%E0%B8%A8%E0%B8%81-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-9-5765'
  },
  {
    name: 'casa-condo-asoke-dindaeng',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-casa-condo-asoke-dindaeng-2075'
  },
  {
    name: 'metris-pattanakarn-ekkamai',
  url: 'https://www.ddproperty.com/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-metris-pattanakarn-ekkamai-%E0%B9%80%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%AA-%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3-%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A1%E0%B8%B1%E0%B8%A2-10516'
  },
  {
    name: 'the-privacy-rama-9',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-the-privacy-rama-9-%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0-%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%80%E0%B8%A7%E0%B8%8B%E0%B8%B5%E0%B9%88-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-9-6401'
  },
  {
    name: 'lloyd-soonvijai-thonglor',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-lloyd-soonvijai-thonglor-%E0%B8%A5%E0%B8%AD%E0%B8%A2%E0%B8%94%E0%B9%8C-%E0%B8%A8%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%8C%E0%B8%A7%E0%B8%B4%E0%B8%88%E0%B8%B1%E0%B8%A2-%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%AD-7152'
  },
  {
    name: 'metro-luxe-ratchada',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-metro-luxe-ratchada-%E0%B9%80%E0%B8%A1%E0%B9%82%E0%B8%97%E0%B8%A3%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%8B%E0%B9%8C-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2-4439'
  },
  {
    name: 'chateau-in-town-ratchada-17',
  url: 'https://www.ddproperty.com/en/condo-for-sale/at-%E0%B8%8A%E0%B8%B2%E0%B9%82%E0%B8%95%E0%B8%A7%E0%B9%8C-%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B217-450'
  },
  {
    name: 'victoria-lakeview--2',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-victoria-lakeview-%E0%B8%A7%E0%B8%B4%E0%B8%84%E0%B8%95%E0%B8%AD%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2-%E0%B9%80%E0%B8%A5%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%A7-1441'
  },
  {
    name: 'the-room-sukhumvit-62',
  url: 'https://www.ddproperty.com/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-the-room-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%97-62-%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0%E0%B8%A3%E0%B8%B9%E0%B8%A1-%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%97-62-187'
  },
  {
    name: 'ideo-ratchada-huaykwang',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-ideo-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2-%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%82%E0%B8%A7%E0%B8%B2%E0%B8%87-%E0%B9%84%E0%B8%AD%E0%B8%94%E0%B8%B5%E0%B9%82%E0%B8%AD-%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2-%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%82%E0%B8%A7%E0%B8%B2%E0%B8%87-585'
  },
  {
    name: 'chapter-chula-samyan',
  url: 'https://www.ddproperty.com/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-chapter-chula-samyan-6997'
  },
  {
    name: 'the-crest-park-residences',
  url: 'https://www.ddproperty.com/en/condo-for-sale/at-the-crest-park-residences-%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0-%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%AA%E0%B8%97%E0%B9%8C-%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84-%E0%B9%80%E0%B8%A3%E0%B8%AA%E0%B8%8B%E0%B8%B4%E0%B9%80%E0%B8%94%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AA-7455'
  },
  {
    name: 'the-line-phahonyothin-park',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-the-line-phahonyothin-park-%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0-%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C-%E0%B8%9E%E0%B8%AB%E0%B8%A5%E0%B9%82%E0%B8%A2%E0%B8%98%E0%B8%B4%E0%B8%99-%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84-7511'
  },
  {
    name: 'life-ladprao',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-life-ladprao-%E0%B9%84%E0%B8%A5%E0%B8%9F%E0%B9%8C-%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A7-5642'
  },
  {
    name: 'the-privacy-jatujak',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-the-privacy-jatujak-6661'
  },
  {
    name: 'condolette-ize-ratchathewi',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-condolette-ize-%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B9%80%E0%B8%97%E0%B8%A7%E0%B8%B5-%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94%E0%B9%80%E0%B8%A5%E0%B8%95-%E0%B9%84%E0%B8%AD%E0%B8%8B%E0%B9%8C-%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B9%80%E0%B8%97%E0%B8%A7%E0%B8%B5-2102'
  },
  {
    name: 'line-vibe-phahonyothin',
  url: 'https://www.ddproperty.com/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9%82%E0%B8%94/%E0%B8%97%E0%B8%B5%E0%B9%88-the-line-vibe-%E0%B9%80%E0%B8%94%E0%B8%AD%E0%B8%B0-%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C-%E0%B9%84%E0%B8%A7%E0%B8%9A%E0%B9%8C-10887/%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%95%E0%B9%88%E0%B8%B3%E0%B8%81%E0%B8%A7%E0%B9%88%E0%B8%B2-20000-%E0%B8%9A%E0%B8%B2%E0%B8%97'
  }
];

  module.exports = { projectList };
  