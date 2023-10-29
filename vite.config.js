import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import handlebars from 'vite-plugin-handlebars';
import pagesData from './src/utils/constants/pagesData.json';
import textBundle from './src/utils/constants/text.json';
import feedMessages from './src/utils/tests/feedMessages.json';
import messages from './src/utils/tests/messages.json';

export default defineConfig({

  server: {
    port: 3000,
  },

  root: resolve(__dirname, 'src', 'pages'),

  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  
  input: Object.fromEntries(
		glob.sync('src/pages/*.html').map(file => [
			path.relative('src', file.slice(0, file.length - path.extname(file).length)),
			fileURLToPath(new URL(file, import.meta.url))
		])
	),

  plugins: [

    handlebars({

      partialDirectory: [      
        resolve(__dirname, 'src', 'layouts'),
        resolve(__dirname, 'src', 'partials'),          
        resolve(__dirname, 'src', 'components'),
      ],

      context(pagePath) {
        
        // выберем данные текущей страницы, пока нет роутинга
        const findCurrentPage = Object.values(pagesData).filter(page => page.link === pagePath);
        const currentPageData = (findCurrentPage.length > 0) ? findCurrentPage[0] : pagesData.index;
        
        return {
          pageData: currentPageData,
          pagesData,
          textVars: textBundle,
          messages,
          feedMessages
        };
      },
      
    }), 
    
  ],

}) 