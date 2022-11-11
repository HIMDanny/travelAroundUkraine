import React from 'react'
import {Box, Link, Grid, Stack, Container, Typography, styled} from "@mui/material"

import './Contacts.scss'

import {Form, Social, Map} from '../../components';

const InfoContainer = styled((props) => <Grid {...props}/>)(({theme}) => ({
  [theme.breakpoints.up('laptop')]: {
    padding: '10px',
  },
  [theme.breakpoints.up('xs')]: {
    direction: 'column',
    gap: '80px',
    justifyContent: 'center',
    marginTop: '70px',
  },

}))


const GetInTouch = styled((props) => <Stack {...props}/>)(({theme}) => ({
  [theme.breakpoints.up('tablet')]: {
    padding: '0'
  },
  h2: {
    marginBottom: "30px"
  },
  form: {
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    wrap: 'wrap',
    button: {
      marginTop: '20px',
    }
  },
  [theme.breakpoints.down('tablet')]: {
    padding: '0 30px'
  }
}))

const SocialsBox = styled((props) => <Box{...props}/>)(() => ({
 '&:before' : {
    content: `''`,
    position: 'absolute',
    top: '-60px',
    width: '90%',
    height: '1px',
    backgroundColor: 'black',
   h4:{
      marginBottom: '30px',
   }
  }
}))


const ContactsPage = () => (
  <Stack direction='column' maxWidth='1200px' justifyContent='center' m=' 100px auto 100px auto' id="contacts">
    <Container><Typography textAlign='center' variant="h2">Contact Us</Typography></Container>
    <Map/>
    <InfoContainer container>
      <Grid item xs={5} minWidth='400px'>
        <GetInTouch spacing={10}>
          <Box>
            <Typography variant="h2">
              Contact Info
            </Typography>
            <Grid container direction='row' wrap='nowrap' pt='30px' minWidth='400px' alignItems='center'>
              <Grid container item width='70px' spacing={3} xs={2} direction='column'>
                <Grid item>
                  <Typography fontWeight='bold'>Address:</Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight='bold'>Phone:</Typography>
                </Grid>
                <Grid item>
                  <Typography fontWeight='bold'>Email:</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={9} spacing={3} direction='column'
                    className="contacts__credentials-cred">
                <Grid item>
                  <Typography>Pavla Tychyny Ave, 1В, Kyiv, 02000</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    <Link href="tel:0800335695">0 800 335 695</Link>
                  </Typography>

                </Grid>
                <Grid item>
                  <Typography>
                    <Link href="mailto:office@dan-it.com.ua">office@dan-it.com.ua</Link>
                  </Typography>
                </Grid>
              </Grid>

            </Grid>
          </Box>
          <SocialsBox position='relative'>
            <Typography variant="h2">Get Social</Typography>
            <Social/>
          </SocialsBox>
        </GetInTouch>
      </Grid>
      <Grid item xs={9} tablet={5} minWidth='400px'>
        <GetInTouch>
          <Typography variant="h2">
            Get In Touch with Us
          </Typography>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Distinctio iusto neque non sequi velit! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Magni, voluptatum.
          </Typography>
          <Form/>
        </GetInTouch>
      </Grid>

    </InfoContainer>
  </Stack>


)

export default ContactsPage