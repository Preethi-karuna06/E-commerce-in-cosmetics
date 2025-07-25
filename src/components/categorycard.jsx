import React from 'react';
import { useNavigate } from 'react-router-dom';
import skincareImg from './../assets/skincare.png';
import perfumeImg from './../assets/perfume.jpg';
import haircareImg from './../assets/haircare.jpg';
import makeupImg from './../assets/makeup.jpg';

const CategoryImages = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate('/facial-creams', { state: { selectedCategory: categoryName } });
  };

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick('Skin Care')}>
        <img src={skincareImg} alt="Skin Care" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <p>Skin Care</p>
      </div>

      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick('Hair Care')}>
        <img src={haircareImg} alt="Hair Care" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <p>Hair Care</p>
      </div>

      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick('Perfume')}>
        <img src={perfumeImg} alt="Perfume" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <p>Perfume</p>
      </div>

      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleClick('Makeup')}>
        <img src={makeupImg} alt="Makeup" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <p>Makeup</p>
      </div>
    </div>
  );
};

export default CategoryImages;
