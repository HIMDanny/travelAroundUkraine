import React from 'react'
import {Box, Link, Grid, Stack, Container, Typography} from "@mui/material"

import './Contacts.scss'

import {Form ,Social,Map} from '../../components'



const ContactsPage = () => (
    <Stack direction='column' maxWidth='1200px' justifyContent='center' m =' 50px auto 100px auto' id="contacts">
        <Container alignItems='center' className='contacts-header'><Typography textAlign='center' variant="h4">Contact
            Us</Typography></Container>
        <Map/>
        <Grid container gap='80px' justifyContent='center' mt='70px'  className='contacts__container'
              sx={{
                  direction: {
                      lg: 'row',
                      sx: 'column',
                  },
              }}>
            <Grid item xs={5} minWidth='440px'>
                <Stack direction='column' spacing={10} ml='50px' className="contacts__info">
                    <Box>
                        <Typography variant="h4">
                            Contact Info
                        </Typography>
                        <Grid container direction='row' wrap='nowrap' pt='30px' className="contacts__credentials">
                            <Grid container item width='70px' spacing={3} xs={2} direction='column'
                                  className="contacts__credentials-names">
                                <Grid item>
                                    <Typography color='black' fontWeight='bold'>Address:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='black' fontWeight='bold'>Phone:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='black' fontWeight='bold'>Email:</Typography>
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
                    <Box className="contacts__socials">
                        <Typography variant="h4">Get Social</Typography>
                        <Social/>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={6} minWidth='440px'>
                <Stack className="contacts__message">
                    <Typography variant="h4">
                        Get In Touch with Us
                    </Typography>
                    <Typography variant="p">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Distinctio iusto neque non sequi velit! Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Magni, voluptatum.
                    </Typography>
                    <Form/>
                </Stack>
            </Grid>

        </Grid>
    </Stack>


)

export default ContactsPage