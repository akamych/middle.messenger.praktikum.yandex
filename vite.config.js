import { defineConfig } from 'vite';
import { resolve } from 'path';
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