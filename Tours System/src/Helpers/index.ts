
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
