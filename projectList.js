const projectList = [
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-aspire-asoke-ratchada',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-aspire-asoke-ratchada-แอสปาย-อโศก-รัชดา-6894',
      url_living: 'https://www.livinginsider.com/living_project/14/2996/Condo/Rent/all/1/แอสปาย-อโศก-รัชดา.html',
      name: 'aspire-asoke-ratchada'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-lumpini-park-rama-9-ratchada',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-lumpini-park-rama-9-ratchada-ลุมพินี-พาร์ค-พระราม-9-รัชดา-5114',
      url_living: 'https://www.livinginsider.com/living_project/14/1113/Condo/Rent/all/1/ลุมพินี-พาร์ค-พระราม-9-รัชดา.html',
      name: 'lumpini-park-rama-9-ratchada'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-life-asoke-rama-9',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-life-asoke-rama-9-ไลฟ์-อโศก-พระราม-9-5765',
      url_living: 'https://www.livinginsider.com/living_project/14/2743/Condo/Rent/all/1/ไลฟ์-อโศก-พระราม-9.html',
      name: 'life-asoke-rama-9'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-casa-condo-asoke-dindaeng',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-casa-condo-asoke-dindaeng-2075',
      url_living: 'https://www.livinginsider.com/living_project/14/1124/Condo/Rent/all/1/คาซ่า-คอนโด-อโศก-ดินแดง.html',
      name: 'casa-condo-asoke-dindaeng'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-metris-pattanakarn-ekkamai',
      url_dd: 'https://www.ddproperty.com/ขายคอนโด/ที่-metris-pattanakarn-ekkamai-เมทริส-พัฒนาการ-เอกมัย-10516',
      url_living: 'https://www.livinginsider.com/living_project/16/2724/Condo/Rent/all/1/เมทริส-พัฒนาการ-เอกมัย.html',
      name: 'metris-pattanakarn-ekkamai'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-privacy-rama-9',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-the-privacy-rama-9-เดอะ-ไพรเวซี่-พระราม-9-6401',
      url_living: 'https://www.livinginsider.com/living_project/14/2769/Condo/Rent/all/1/เดอะ-ไพรเวซี่-พระราม-9.html',
      name: 'the-privacy-rama-9'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-lloyd-soonvijai-thonglor',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-lloyd-soonvijai-thonglor-ลอยด์-ศูนย์วิจัย-ทองหล่อ-7152',
      url_living: 'https://www.livinginsider.com/living_project/14/3133/Condo/Rent/all/1/ลอยด์-ศูนย์วิจัย-ทองหล่อ.html',
      name: 'lloyd-soonvijai-thonglor'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-metro-luxe-ratchada',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-metro-luxe-ratchada-เมโทรลักซ์-รัชดา-4439',
      url_living: 'https://www.livinginsider.com/living_project/13/3202/Condo/Rent/all/1/เมโทร-ลักซ์-รัชดา.html',
      name: 'metro-luxe-ratchada'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-chateau-in-town-ratchada-17',
      url_dd: 'https://www.ddproperty.com/en/condo-for-sale/at-ชาโตว์-อินทาวน์-รัชดา17-450',
      url_living: 'https://www.livinginsider.com/living_project/13/1060/Condo/Rent/all/1/ชาโตว์-อินทาวน์-รัชดา-17.html',
      name: 'chateau-in-town-ratchada-17'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-victoria-lakeview--2',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-victoria-lakeview-วิคตอเรีย-เลควิว-1441',
      url_living: 'https://www.livinginsider.com/living_project/36/1471/Condo/Rent/all/1/วิคตอเรีย-เลควิว-คอนโดมิเนียม.html',
      name: 'victoria-lakeview--2'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-room-sukhumvit-62',
      url_dd: 'https://www.ddproperty.com/ขายคอนโด/ที่-the-room-สุขุมวิท-62-เดอะรูม-สุขุมวิท-62-187',
      url_living: 'https://www.livinginsider.com/living_project/19/490/Condo/Rent/all/1/เดอะรูม-สุขุมวิท-62.html',
      name: 'the-room-sukhumvit-62'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-ideo-ratchada-huaykwang',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-ideo-รัชดา-ห้วยขวาง-ไอดีโอ-รัชดา-ห้วยขวาง-585',
      url_living: 'https://www.livinginsider.com/living_project/13/1046/Condo/Rent/all/1/Ideo-รัชดา-ห้วยขวาง.html',
      name: 'ideo-ratchada-huaykwang'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-chapter-chula-samyan',
      url_dd: 'https://www.ddproperty.com/ขายคอนโด/ที่-chapter-chula-samyan-6997',
      url_living: 'https://www.livinginsider.com/living_project/5/3008/Condo/Rent/all/1/แชปเตอร์-จุฬา-สามย่าน.html',
      name: 'chapter-chula-samyan'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-crest-park-residences',
      url_dd: 'https://www.ddproperty.com/en/condo-for-sale/at-the-crest-park-residences-เดอะ-เครสท์-พาร์ค-เรสซิเดนเซส-7455',
      url_living: 'https://www.livinginsider.com/living_project/10/3039/Condo/Rent/all/1/เดอะ-เครสท์-พาร์ค-เรสซิเดนซ์.html',
      name: 'the-crest-park-residences'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-line-phahonyothin-park',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-the-line-phahonyothin-park-เดอะ-ไลน์-พหลโยธิน-พาร์ค-7511',
      url_living: 'https://www.livinginsider.com/living_project/10/2933/Condo/Rent/all/1/เดอะ-ไลน์-พหลโยธิน-พาร์ค.html',
      name: 'the-line-phahonyothin-park'
    },
    {
      url_hub: 'https://propertyhub.in.th/ขายคอนโด/โครงการ-life-ladprao',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-life-ladprao-ไลฟ์-ลาดพร้าว-5642',
      url_living: 'https://www.livinginsider.com/living_project/10/2668/Condo/Rent/all/1/ไลฟ์-ลาดพร้าว.html',
      name: 'life-ladprao'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-privacy-jatujak',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-the-privacy-jatujak-6661',
      url_living: 'https://www.livinginsider.com/living_project/9/2884/Condo/all/all/1/เดอะไพรเวซี่-จตุจักร.html',
      name: 'the-privacy-jatujak'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-condolette-ize-ratchathewi',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-condolette-ize-ราชเทวี-คอนโดเลต-ไอซ์-ราชเทวี-2102',
      url_living: 'https://www.livinginsider.com/living_project/7/760/Condo/Rent/all/1/คอนโดเลต-ไอซ์-ราชเทวี.html',
      name: 'condolette-ize-ratchathewi'
    },
    {
      url_hub: 'https://propertyhub.in.th/เช่าคอนโด/โครงการ-the-line-vibe-phahonyothin',
      url_dd: 'https://www.ddproperty.com/เช่าคอนโด/ที่-the-line-vibe-เดอะ-ไลน์-ไวบ์-10887/ราคาต่ำกว่า-20000-บาท',
      url_living: 'https://www.livinginsider.com/living_project/10/4509/Condo/all/all/1/เดอะ-ไลน์-ไวบ์.html',
      name: 'line-vibe-phahonyothin'
    }
    
  ];

  module.exports = { projectList };
