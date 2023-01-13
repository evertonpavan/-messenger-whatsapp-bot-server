import * as yup from 'yup';
import { NextFunction, Request, Response } from "express";
import { deleteUploadedFiles } from '../../../helpers/deleteUploadedFiles';
import { IMulterRequest } from '../../../interfaces/IMulterRequest';
import { AppError } from '../../../errors/AppError';

const resourceSchema = yup.object().shape({
    files: yup.object().shape({
        file: yup.array().of(
            yup.object().shape({
                fieldname: yup.string().required(),
                originalname: yup.string().required(),
                encoding: yup.string().required(),
                destination: yup.string().required(),
                filename: yup.string().required(),
                mimetype: yup.string().required(),
                path: yup.string().required(),
                size: yup.number().required(),
            })
        ).required('file is required'),
    })
})

const validateResourceMW = (resourceSchema: any) => async (request: Request, response: Response, next: NextFunction) => {

    // console.log('validate resource data...')
    // console.log('request', request)

    const resourceBody = request.body;
    const resourceFiles = (request as IMulterRequest).files;
    const files = request as IMulterRequest

    console.log('resourceBody', resourceBody);
    console.log('resourceFiles', resourceFiles);


    const resource = {
        // body: resourceBody,
        files: resourceBody.file.formData
    }

    try {
        await resourceSchema.validate(resource);

        next();
    } catch (e: any) {
        deleteUploadedFiles(files)

        const stringErros = e.errors.join(', ');

        throw new AppError(stringErros, 400);
    }
};

export { validateResourceMW, resourceSchema };