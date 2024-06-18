
import Joi from 'joi'
import joi from 'joi'


export const RegisterSchema = Joi.object({
    Name:Joi.string().required(),
    Email:Joi.string().required().email().messages({
        'string.empty': "Please Enter an Email",
        'string.email': "Please Enter a valid email"
    }),
    Password:Joi.string().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    )
})

export const TourSchema = Joi.object({
    Name: Joi.string().trim().required().min(1),
    Destination: Joi.string().trim().required().min(1),
    Description: Joi.string().trim().required().min(1),
    Price: Joi.number().required().greater(5000)
})

export const HotelSchema = Joi.object({
    Name: Joi.string().trim().required().min(1),
    Location: Joi.string().trim().required().min(1),
    StarRating: Joi.number().required().greater(1)
})

export const BookingSchema = Joi.object({
    TourId: Joi.string().trim().required().min(1),
    HotelId: Joi.string().trim().required().min(1),
    BookingDate : Joi.date().required().min('now')

})

export default RegisterSchema