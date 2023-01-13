import fs from 'fs-extra';
import { IFile } from '../interfaces/IFile';
import { IMulterFiles } from '../interfaces/IMulterFiles';


async function deleteUploadedFiles(filesToDelete: IMulterFiles) {

    console.log('deleting uploaded file...')

    // console.log('filesToDelete', filesToDelete)
    const { file } = filesToDelete.files;

    try {
        if (file !== undefined && file !== null) {
            file.map(async (file: IFile) => {
                await fs.remove(file.path)
            })
        }

        console.log('uploaded file deleted!')

    } catch (err) {
        console.error(err)
    }
}

export { deleteUploadedFiles }   