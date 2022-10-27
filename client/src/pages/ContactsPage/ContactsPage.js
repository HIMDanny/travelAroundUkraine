import React from 'react'
import {Link, Typography} from "@mui/material"
import Map from '../../components/Map/Map'
import './Contacts.scss'

import Form from '../../components/Form/Form'
import Social from '../../components/Socials/Socials'


const ContactsPage = () =>(
        <div id="contacts">
            <div className='contacts-header'><Typography variant="h2">Contact Us</Typography></div>
            <Map/>
            <div className='contacts__container'>
                <div className="contacts__info">
                    <div>
                        <Typography variant="h4" className = "contacts__info-header">
                            Contact Info
                        </Typography>
                        <div className="contacts__credentials">
                            <div className = "contacts__credentials-names">
                                <Typography>Address:</Typography>
                                <Typography>Phone:</Typography>
                                <Typography>Email:</Typography>
                            </div>
                            <div className = "contacts__credentials-cred">
                                <Typography>Pavla Tychyny Ave, 1В, Kyiv, 02000</Typography>
                                <Link href = "tel:0800335695">0 800 335 695</Link>
                                <Link href = "mailto:office@dan-it.com.ua">office@dan-it.com.ua</Link>
                            </div>
                        </div>
                    </div>

                    <div className="contacts__socials">
                        <Typography variant = "h4">Get Social</Typography>
                        <Social/>
                    </div>
                </div>
                <div className="contacts__message">
                    <Typography variant = "h4">
                        Get In Touch with Us
                    </Typography>
                    <Typography variant = "p">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Distinctio iusto neque non sequi velit! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, voluptatum.
                    </Typography>
                    <Form/>
                </div>
            </div>
        </div>


    )

export default ContactsPage