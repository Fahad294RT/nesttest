import { Controller, Post, UseInterceptors, Request} from '@nestjs/common';

import { Express } from 'express'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UploadedFiles } from '@nestjs/common'
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {

	/**
	 * @param {string} file Multiple files (bulk upload only for very small files)
	 * @returns Returns hash of the files in registery
	 */
	@Post('upload')
	@UseInterceptors(
		FilesInterceptor('files', 20, {
		  storage: diskStorage({
		    destination: './uploads/',
		    //filename: "someFilename.txt",
		  }),
			//fileFilter: imageFileFilter,
		}),
	)
	uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
	  const response = [];
    files.forEach(file => {
      const fileReponse = {
        filename: file.filename,
      };
      response.push(fileReponse);
    });

    /*
    	forward to storage
				https://stackoverflow.com/a/52261427
				make proper service and function
					donot perform cleanup
				middleware to check which resource can have files
    */
    // add item to global registery
    // update resource reference

    return response;
	}

	//donwload stream link here, auth based
}