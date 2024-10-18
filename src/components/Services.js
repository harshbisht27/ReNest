import React from 'react';

const ReNestServices = () => {
  const services = [
    {
      name: 'Super Convenient',
      description: `Donate reusable items from the convenience of your house. Avail doorstep pickup and get your donations delivered to the ones in need.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-1-150x150.png',  // Replace with actual path
    },
    {
      name: 'Feel Good Factor',
      description: `Giving gives you pleasure and makes you happier by bringing a positive and uplifting effect.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-3-150x150.png',  // Replace with actual path
    },
    {
      name: 'Your Donations are Valued',
      description: `We make sure your donations reach someone who really needs them by delivering them directly to the beneficiaries.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-5-150x150.png',  // Replace with actual path
    },
    {
      name: 'Transparent Process',
      description: `Your donations reach beneficiaries through verified trusted partners, with regular audits ensuring transparency.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-2-150x150.png',  // Replace with actual path
    },
    {
      name: 'Get Surprise Rewards',
      description: `We surprise you with "happiness boxes" containing surprise goodies and vouchers for your generosity.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-4-150x150.png',  // Replace with actual path
    },
    {
      name: 'Save the Environment',
      description: `Keep your unwanted belongings out of landfills by giving them a new life and getting them in the hands of those who need them.`,
      imgSrc: 'https://shareatdoorstep.com/wp-content/uploads/2018/07/sads-6-150x150.png',  // Replace with actual path
    }
  ];

  return (
    <div className="services-container">
      <h1 className='service-heading'>Why Donate Through Re-Nest</h1>
      <div className="heading-underline"></div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.imgSrc} alt={`${service.name} logo`} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReNestServices;
