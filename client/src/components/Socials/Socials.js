import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TelegramIcon from '@mui/icons-material/Telegram';
import {Box, styled} from '@mui/material'

const SocialsContainer = styled((props) => <Box{...props}/>)(() => ({
  display: 'flex',
  flexDirection: 'row'
}))

const SocialItem = styled('div')(()=>({
  backgroundColor : 'rgba(40, 44, 52, 0.2)',
  margin: '5px',
  width: '40px',
  height : '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  cursor : 'pointer',
  transition: 'all 0.3s ease',
  '&:hover':{
    backgroundColor : 'rgba(0, 75, 252, 0.04)'
  }
}))



const Social = () => {
  const icons = [<FacebookIcon/>, <TwitterIcon/>, <LinkedInIcon/>, <YouTubeIcon/>, <PinterestIcon/>, <TelegramIcon/>]
  return (
    <SocialsContainer>
      {
        icons.map((icon,i) => {
          const key = icon + i;
         return<SocialItem key={key}> {icon} </SocialItem>
        })
      }
    </SocialsContainer>
  )
}
export default Social