import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  fileFilter: (req, file, cb) => {
    if (
      !file.originalname.match(
        // /\.(jpg|jpeg|png|gif|bmp|tif|tiff|webp|ico|svg|heif|heic)$/i,
        /\.(jpg|jpeg|png|gif|bmp|tif|tiff)$/i,
      )
    ) {
      return cb(null, false);
    }
    cb(null, true);
  },
  storage: diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
      const day = String(currentDate.getDate()).padStart(2, '0');
      const curdate = `${year}-${month}-${day}`;

      function generateName(): string {
        const characters = 'PhudVang20y';
        let randomName = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomName += characters.charAt(randomIndex);
        }
        return randomName;
      }
    
      const randomName = generateName();
      const extension = extname(file.originalname);
      callback(null, `user_${curdate}_${randomName}${extension}`);
    },
  }),
};


export function getAssetUrl(imagePath: string): string {
    const baseUrl = 'http://localhost:3000'; // Fallback URL if env variable is not set
    const normalizedPath = imagePath.startsWith('/')
    ? imagePath.slice(1)
    : imagePath;
    return new URL(`/uploads/${normalizedPath}`, baseUrl).href;
}

// export function getAssetUrl(imagePath: string): string {
//     const baseUrl = process.env.BASE_URL || process.env.DEV_URL || 'http://localhost:3000'; // Fallback to localhost
//     const normalizedPath = imagePath.startsWith('/')
//       ? imagePath.slice(1) // Remove leading slash
//       : imagePath;
  
//     return new URL(`/uploads/${normalizedPath}`, baseUrl).href;
//   }
  
