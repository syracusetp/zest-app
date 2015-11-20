module.exports = function(db) {
    // --------------  Employees
    db.Employee.create({
        nickName: 'Cecilia M',
        firatName: 'Cecilia',
        lastName: 'Murphy',
        active: true
    });
    db.Employee.create({
        nickName: 'Ismail O',
        firatName: 'Ismail',
        lastName: 'Oyewole',
        active: true
    });
    db.Employee.create({
        nickName: 'Daniel O',
        firatName: 'Daniel',
        lastName: 'Oduntan',
        active: true
    });
    db.Employee.create({
        nickName: 'Best O',
        firatName: 'Best',
        lastName: 'Oshie',
        active: true
    });
    db.Employee.create({
        nickName: 'Blessing S',
        firatName: 'Blessing',
        lastName: 'Samuel',
        active: true
    });

    // --------------  Booking Service Types
    db.ServiceType.create({
      rank: 0,
      name: 'home-cleaning',
      description: 'Home Cleaning',
      iconSrc: '/assets/images/noun_170055_cc.png',
      active: true
    });
    db.ServiceType.create({
      rank: 1,
      name: 'office-cleaning',
      description: 'Office Cleaning',
      iconSrc: '/assets/images/noun_17159_cc.png',
      active: true
    });
    db.ServiceType.create({
      rank: 2,
      name: 'fumigation',
      description: 'Fumigation',
      iconSrc: '/assets/images/fumigation-sm.png',
      active: true
    });
    db.ServiceType.create({
      rank: 3,
      name: 'air-conditioner',
      description: 'Air Conditioner',
      iconSrc: '/assets/images/noun_36185_cc.png',
      active: true
    });
    db.ServiceType.create({
      rank: 4,
      name: 'post-construction-cleaning',
      description: 'Post Construction Cleaning',
      iconSrc: '/assets/images/noun_210477_cc.png',
      active: true
    });

    // --------------  Frequencies
    db.Frequency.create({
        name: 'once',
        description: 'Once',
        rate: 1800
    });
    db.Frequency.create({
        name: 'daily',
        description: 'Daily',
        rate: 1350
    });
    db.Frequency.create({
        name: 'weekly',
        description: 'Weekly',
        rate: 1530
    });
    db.Frequency.create({
        name: 'bi-weekly',
        description: 'Bi-Weekly',
        rate: 1620
    });
    db.Frequency.create({
        name: 'monthly',
        description: 'Monthly',
        rate: 1800
    });

    // --------------  Extras
    db.HomeCleaningExtra.create({
        name: 'fans',
        iconSrc: '/assets/images/extras/circle_fans.png',
        rate: 300,
        variable: true,
        description: 'Fans'
    });
    db.HomeCleaningExtra.create({
        name: 'fridge',
        iconSrc: '/assets/images/extras/circle_fridge.png',
        rate: 450,
        description: 'Inside Fridge'
    });
    db.HomeCleaningExtra.create({
        name: 'oven',
        iconSrc: '/assets/images/extras/circle_oven.png',
        rate: 1800,
        description: 'Inside Oven'
    });
    db.HomeCleaningExtra.create({
        name: 'cabinets',
        iconSrc: '/assets/images/extras/circle_cabinets.png',
        rate: 450,
        description: 'Inside Cabinets'
    });
    db.HomeCleaningExtra.create({
        name: 'windows',
        iconSrc: '/assets/images/extras/circle_windows.png',
        rate: 450,
        variable: true,
        description: 'Interior Windows'
    });

    // --------------  Zones
    db.Zone.create({
      category: 'Lagos Island',
      neighborhood: 'Victoria Island',
      rate: 0
    });
    db.Zone.create({
      category: 'Lagos Island',
      neighborhood: 'Ikoyi',
      rate: 0
    });
    db.Zone.create({
      category: 'Lagos Island',
      neighborhood: 'Obalende',
      rate: 0
    });
    db.Zone.create({
      category: 'Lagos Island',
      neighborhood: 'Marina',
      rate: 0
    });
    db.Zone.create({
      category: 'Island 1',
      neighborhood: 'Lekki',
      rate: 860
    });
    db.Zone.create({
      category: 'Island 1',
      neighborhood: 'Ajah',
      rate: 860
    });
    db.Zone.create({
      category: 'Island 1',
      neighborhood: 'Victoria Garden City',
      rate: 860
    });
    db.Zone.create({
      category: 'Mainland 1',
      neighborhood: 'Yaba',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 1',
      neighborhood: 'Surulere',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 1',
      neighborhood: 'Ebute-metta',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 1',
      neighborhood: 'Somolu',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 1',
      neighborhood: 'Mushin',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Ikeja',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Maryland',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Bariga',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Gbagada',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Oworonshoki',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Anthony',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Ilupeju',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 2',
      neighborhood: 'Ogudu',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 3',
      neighborhood: 'Apapa',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 3',
      neighborhood: 'Ajeromi-Ifelodun',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 3',
      neighborhood: 'Ajegunle',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 4',
      neighborhood: 'Festac',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 4',
      neighborhood: 'Mile 2',
      rate: 0
    });
    db.Zone.create({
      category: 'Mainland 4',
      neighborhood: 'Amuwo Odofin',
      rate: 0
    });
};
