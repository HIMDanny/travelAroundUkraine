import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TelegramIcon from '@mui/icons-material/Telegram';

const Social = () => {
  const icons = [<FacebookIcon/>, <TwitterIcon/>, <LinkedInIcon/>, <YouTubeIcon/>, <PinterestIcon/>, <TelegramIcon/>]
  return (
    <div className='contacts__socials-container'>
      {
        icons.map((icon, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className='contacts__socials-item'> {icon} </div>))
      }
    </div>
  )
}
export default Social